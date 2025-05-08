import os
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers import Input, GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.applications.efficientnet_v2 import EfficientNetV2S
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# --- Configuration ---
IMG_WIDTH = 300 # Updated image size for EfficientNetV2S
IMG_HEIGHT = 300
IMG_SIZE = (IMG_HEIGHT, IMG_WIDTH)
BATCH_SIZE = 32
EPOCHS = 15 # Updated epochs

TRAIN_DIR = '/Users/jeevanbalagam/Desktop/Hackathons/SJ Hacks/train' # Updated path
VALID_DIR = 'valid'
TRAIN_JSON = os.path.join(TRAIN_DIR, '_annotations.coco.json')
VALID_JSON = os.path.join(VALID_DIR, '_annotations.coco.json')
MODEL_SAVE_PATH = 'garbage_classification_model.keras'

# --- Annotation Loading ---
def load_annotations(json_path):
    """Loads COCO annotations and determines labels (1 if annotated, 0 otherwise)."""
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"Annotation file not found: {json_path}")

    with open(json_path, 'r') as f:
        coco_data = json.load(f)

    image_id_to_filename = {img['id']: img['file_name'] for img in coco_data.get('images', [])}
    annotated_image_ids = {ann['image_id'] for ann in coco_data.get('annotations', [])}

    image_labels = {}
    for img_id, filename in image_id_to_filename.items():
        label = 1 if img_id in annotated_image_ids else 0
        image_labels[filename] = label

    print(f"Loaded annotations for {len(image_labels)} images from {json_path}.")
    # Count labels
    needs_cleaning = sum(1 for label in image_labels.values() if label == 1)
    clean = len(image_labels) - needs_cleaning
    print(f"  Needs Cleaning (annotated): {needs_cleaning}")
    print(f"  Clean (not annotated): {clean}")

    if not image_labels:
         print(f"Warning: No images found in {json_path}. Check the annotation file structure.")


    return image_labels

# --- Dataset Creation ---
def load_and_preprocess_image(image_path, label):
    """Loads and preprocesses a single image."""
    try:
        # Load image
        img = tf.io.read_file(image_path)
        # Decode image - handle potential decoding errors
        img = tf.image.decode_jpeg(img, channels=3) # Assuming JPEG, adjust if other formats
        # Resize
        img = tf.image.resize(img, [IMG_HEIGHT, IMG_WIDTH])
        # Normalize pixel values to [0, 1]
        img = img / 255.0
        return img, tf.cast(label, tf.float32) # Ensure label is float for BCE loss
    except tf.errors.InvalidArgumentError as e:
        print(f"Skipping corrupted image: {image_path}, Error: {e}")
        # Return None or a placeholder to filter out later if needed
        # For simplicity here, we might rely on dataset filtering if many images fail
        # A more robust approach involves identifying and removing/fixing corrupted files beforehand.
        return None # Indicate failure


def create_dataset(image_dir, image_labels, batch_size):
    """Creates a tf.data.Dataset for training or validation."""
    if not os.path.exists(image_dir):
         raise FileNotFoundError(f"Image directory not found: {image_dir}")
    if not image_labels:
        print(f"Warning: No labels provided for directory {image_dir}. Cannot create dataset.")
        return None # Return None or empty dataset

    image_paths = []
    labels = []
    
    filenames_in_dir = set(os.listdir(image_dir))

    for filename, label in image_labels.items():
        # Ensure the image file actually exists in the directory
        if filename in filenames_in_dir:
             image_paths.append(os.path.join(image_dir, filename))
             labels.append(label)
        else:
             print(f"Warning: Image file '{filename}' listed in annotations but not found in directory '{image_dir}'. Skipping.")
             
    if not image_paths:
        print(f"Error: No valid image paths found for directory {image_dir} based on annotations. Check file paths and annotation consistency.")
        return None


    # Create dataset from slices
    path_ds = tf.data.Dataset.from_tensor_slices(image_paths)
    label_ds = tf.data.Dataset.from_tensor_slices(labels)
    image_label_ds = tf.data.Dataset.zip((path_ds, label_ds))

    # Use map to load and preprocess images, handle errors
    # num_parallel_calls=tf.data.AUTOTUNE allows parallel processing
    ds = image_label_ds.map(load_and_preprocess_image, num_parallel_calls=tf.data.AUTOTUNE)

    # Filter out potential None values from failed image loading
    ds = ds.filter(lambda img, label: img is not None)


    # Shuffle, batch, and prefetch
    ds = ds.shuffle(buffer_size=len(image_paths))
    ds = ds.batch(batch_size)
    ds = ds.prefetch(buffer_size=tf.data.AUTOTUNE) # Improve performance

    print(f"Created dataset from {image_dir} with {len(image_paths)} images.")
    return ds

# --- Model Definition ---
def build_model(input_shape):
    """Builds the transfer learning model using EfficientNetV2S."""
    # Load pre-trained EfficientNetV2S without the classification head
    base_model = EfficientNetV2S(input_shape=input_shape, include_top=False, weights='imagenet')

    # Freeze the base model layers
    base_model.trainable = False

    # Create new model head
    inputs = Input(shape=input_shape)
    # Pass the inputs through the base model
    # EfficientNetV2 includes its own preprocessing, so no explicit tf.keras.applications.efficientnet_v2.preprocess_input needed here when loaded this way
    x = base_model(inputs, training=False) # Ensure base model is in inference mode
    # Add pooling and output layer
    x = GlobalAveragePooling2D()(x)
    outputs = Dense(1, activation='sigmoid')(x) # Binary classification output

    model = Model(inputs, outputs)
    return model

# --- Training ---
if __name__ == "__main__":
    print("TensorFlow Version:", tf.__version__)

    # Check for GPU availability
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            # Currently, memory growth needs to be the same across GPUs
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
            logical_gpus = tf.config.list_logical_devices('GPU')
            print(f"{len(gpus)} Physical GPUs, {len(logical_gpus)} Logical GPUs found and configured.")
        except RuntimeError as e:
            # Memory growth must be set before GPUs have been initialized
            print(f"Error configuring GPU memory growth: {e}")
    else:
        print("No GPU found. Using CPU.")

    # 1. Load Annotations
    print("Loading training annotations...")
    train_labels = load_annotations(TRAIN_JSON)
    print("Loading validation annotations...")
    valid_labels = load_annotations(VALID_JSON)
    
    if not train_labels or not valid_labels:
        print("Error: Could not load labels. Exiting.")
        exit()

    # 2. Create Datasets
    print("Creating training dataset...")
    train_ds = create_dataset(TRAIN_DIR, train_labels, BATCH_SIZE)
    print("Creating validation dataset...")
    valid_ds = create_dataset(VALID_DIR, valid_labels, BATCH_SIZE)

    if train_ds is None or valid_ds is None:
        print("Error: Failed to create datasets. Exiting.")
        exit()


    # 3. Build Model
    print("Building model...")
    model = build_model(input_shape=(IMG_HEIGHT, IMG_WIDTH, 3))

    # 4. Compile Model
    print("Compiling model...")
    model.compile(optimizer=tf.keras.optimizers.Adam(),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    model.summary()

    # 5. Train Model
    print(f"Starting training for {EPOCHS} epochs...")
    history = model.fit(
        train_ds,
        validation_data=valid_ds,
        epochs=EPOCHS
    )

    # 6. Save Model
    print(f"Training complete. Saving model to {MODEL_SAVE_PATH}...")
    model.save(MODEL_SAVE_PATH)
    print("Model saved successfully.") 
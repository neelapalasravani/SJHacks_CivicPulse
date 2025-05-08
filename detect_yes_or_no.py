import tensorflow as tf
import numpy as np
import os
import sys
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# --- Configuration (should match training) ---
MODEL_SAVE_PATH = 'garbage_classification_model.keras'
IMG_WIDTH = 300
IMG_HEIGHT = 300

def preprocess_image(image_path, target_size=(IMG_HEIGHT, IMG_WIDTH)):
    """Loads and preprocesses a single image for prediction."""
    try:
        img = tf.io.read_file(image_path)
        img = tf.image.decode_jpeg(img, channels=3) # Assume JPEG
        img = tf.image.resize(img, target_size)
        img = img / 255.0  # Normalize to [0, 1]
        # Expand dimensions to create a batch of 1
        img = tf.expand_dims(img, axis=0) 
        return img
    except Exception as e:
        print(f"Error processing image {image_path}: {e}", file=sys.stderr)
        return None

if __name__ == "__main__":
    # 1. Load the trained model
    if not os.path.exists(MODEL_SAVE_PATH):
        print(f"Error: Model file not found at {MODEL_SAVE_PATH}", file=sys.stderr)
        sys.exit(1)
    
    print(f"Loading model from {MODEL_SAVE_PATH}...")
    try:
        model = tf.keras.models.load_model(MODEL_SAVE_PATH)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading model: {e}", file=sys.stderr)
        sys.exit(1)

    # 2. Get image path from user
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        print(f"Using image path from command line argument: {image_path}")
    else:
        try:
            image_path = input("Please enter the path to the image: ")
        except EOFError:
             print("\nNo input provided. Exiting.")
             sys.exit(1)


    # 3. Check if image exists
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}", file=sys.stderr)
        sys.exit(1)

    # 4. Preprocess the image
    print("Preprocessing image...")
    processed_image = preprocess_image(image_path)

    if processed_image is None:
        sys.exit(1) # Error message already printed in preprocess_image

    # 5. Make prediction
    print("Predicting...")
    try:
        prediction = model.predict(processed_image)
        # prediction is likely [[probability]] due to batch dimension and single output neuron
        probability_needs_cleaning = prediction[0][0] 
    except Exception as e:
        print(f"Error during prediction: {e}", file=sys.stderr)
        sys.exit(1)

    # 6. Interpret and print result
    print(f"\nPrediction Probability (needs cleaning): {probability_needs_cleaning:.4f}")
    
    # Threshold can be adjusted if needed
    threshold = 0.5 
    if probability_needs_cleaning >= threshold:
        print("Result: Cleaning Required")
    else:
        print("Result: Clean") 
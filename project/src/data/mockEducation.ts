export interface EducationContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'hygiene' | 'waste' | 'menstrual';
  content: string;
  videoUrl?: string;
}

export const mockEducationContent: EducationContent[] = [
  {
    id: 'edu1',
    title: 'Proper Handwashing Technique',
    description: 'Learn the correct way to wash your hands to prevent the spread of disease.',
    imageUrl: 'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'hygiene',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Why Handwashing is Important</h2>
      <p class="text-base text-gray-700 leading-relaxed mb-6">Regular handwashing is one of the best ways to remove germs, avoid getting sick, and prevent the spread of germs to others.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">When to Wash Your Hands</h3>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Before, during, and after preparing food</li>
        <li>Before eating</li>
        <li>Before and after caring for someone who is sick</li>
        <li>After using the toilet</li>
        <li>After changing diapers or cleaning up a child who has used the toilet</li>
        <li>After blowing your nose, coughing, or sneezing</li>
        <li>After touching an animal, animal feed, or animal waste</li>
        <li>After handling pet food or pet treats</li>
        <li>After touching garbage</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Five Steps to Wash Your Hands the Right Way</h3>
      <ol class="list-decimal pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Wet your hands with clean, running water (warm or cold), turn off the tap, and apply soap.</li>
        <li>Lather your hands by rubbing them together with the soap. Lather the backs of your hands, between your fingers, and under your nails.</li>
        <li>Scrub your hands for at least 20 seconds. Need a timer? Hum the "Happy Birthday" song from beginning to end twice.</li>
        <li>Rinse your hands well under clean, running water.</li>
        <li>Dry your hands using a clean towel or air dry them.</li>
      </ol>
    `,
    videoUrl: 'https://www.youtube.com/embed/3PmVJQUCm4E'
  },
  {
    id: 'edu2',
    title: 'Responsible Waste Disposal',
    description: 'Learn how to properly sort and dispose of different types of waste.',
    imageUrl: 'https://images.pexels.com/photos/6963591/pexels-photo-6963591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'waste',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Waste Sorting Guide</h2>
      <p class="text-base text-gray-700 leading-relaxed mb-6">Proper waste sorting is essential for effective recycling and waste management. By following these guidelines, you can help reduce landfill waste and protect the environment.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Recyclables</h3>
      <p class="text-base text-gray-700 mb-2">These items go in your blue bin:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Paper and cardboard (clean and dry)</li>
        <li>Glass bottles and jars (empty and rinsed)</li>
        <li>Metal cans (empty and rinsed)</li>
        <li>Plastic bottles and containers with recycling symbols #1-5 and #7</li>
        <li>Aluminum foil (clean)</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Compostables</h3>
      <p class="text-base text-gray-700 mb-2">These items go in your green bin:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Food scraps and leftovers</li>
        <li>Coffee grounds and filters</li>
        <li>Tea bags (paper only)</li>
        <li>Yard waste and plant trimmings</li>
        <li>Food-soiled paper products (napkins, paper towels, pizza boxes)</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Landfill Waste</h3>
      <p class="text-base text-gray-700 mb-2">These items go in your black bin:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Plastic bags and film</li>
        <li>Styrofoam</li>
        <li>Disposable diapers</li>
        <li>Pet waste</li>
        <li>Broken ceramic or dishware</li>
        <li>Non-recyclable plastics (#6 plastic)</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Hazardous Waste</h3>
      <p class="text-base text-gray-700 mb-2">These items require special disposal:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Batteries</li>
        <li>Electronics</li>
        <li>Paint and chemicals</li>
        <li>Fluorescent light bulbs</li>
        <li>Medical sharps</li>
        <li>Medication</li>
      </ul>
      
      <p class="text-base text-gray-700">Visit the San Jose Environmental Services Department website for more information on proper disposal methods and drop-off locations for hazardous waste.</p>
    `
  },
  {
    id: 'edu3',
    title: 'Menstrual Hygiene Management',
    description: 'Essential information about maintaining proper menstrual hygiene.',
    imageUrl: 'https://images.pexels.com/photos/5938412/pexels-photo-5938412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'menstrual',
    content: `
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Menstrual Hygiene Management</h2>
      <p class="text-base text-gray-700 leading-relaxed mb-6">Good menstrual hygiene is crucial for the health, well-being, and dignity of women and girls. This guide provides essential information about maintaining proper menstrual hygiene.</p>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Choosing Menstrual Products</h3>
      <p class="text-base text-gray-700 mb-2">There are many options available:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li><strong>Disposable pads:</strong> Easy to use and widely available.</li>
        <li><strong>Tampons:</strong> Worn internally, allowing for more freedom of movement.</li>
        <li><strong>Menstrual cups:</strong> Reusable silicone cups that can be worn for up to 12 hours.</li>
        <li><strong>Period underwear:</strong> Absorbent underwear that can be washed and reused.</li>
        <li><strong>Reusable cloth pads:</strong> Environmentally friendly option that can be washed and reused.</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Changing Products Regularly</h3>
      <p class="text-base text-gray-700 mb-2">It's important to change menstrual products regularly to prevent infections and odor:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Change pads every 4-6 hours or when they become saturated</li>
        <li>Change tampons every 4-8 hours to prevent toxic shock syndrome</li>
        <li>Empty menstrual cups every 8-12 hours</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Proper Disposal</h3>
      <p class="text-base text-gray-700 mb-2">Proper disposal of menstrual products is important for environmental and public health:</p>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Wrap used disposable pads and tampons in toilet paper or their original wrappers before placing them in waste bins</li>
        <li>Never flush pads, tampons, or applicators down the toilet as they can cause blockages</li>
        <li>Look for designated sanitary waste bins in public restrooms</li>
      </ul>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4">Maintaining Personal Hygiene</h3>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-700 mb-6">
        <li>Wash your hands before and after changing menstrual products</li>
        <li>Bathe or shower daily with mild soap and water</li>
        <li>Change underwear daily</li>
        <li>Avoid using scented products in the genital area as they can cause irritation</li>
      </ul>
      
      <p class="text-base text-gray-700">Remember that menstruation is a natural process and nothing to be ashamed of. If you experience severe pain, unusually heavy bleeding, or other concerning symptoms, consult a healthcare provider.</p>
    `
  }
];

export const getEducationContentByCategory = (category: 'hygiene' | 'waste' | 'menstrual'): EducationContent[] => {
  return mockEducationContent.filter(content => content.category === category);
};

export const getEducationContentById = (id: string): EducationContent | undefined => {
  return mockEducationContent.find(content => content.id === id);
};

export const getAllEducationContent = (): EducationContent[] => {
  return mockEducationContent;
};
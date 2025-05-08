import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, AlertCircle, HelpCircle, Check, MapPin, Loader2, Navigation } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useReport } from '../hooks/useReport';
import { useGeolocation } from '../hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';

interface LocationData {
  id: string;
  name: string;
  type: string;
  address: string;
}

const SupportPage: React.FC = () => {
  const [issueType, setIssueType] = useState<string>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();
  const { addReport } = useReport();
  const navigate = useNavigate();
  const { loading, error, address, getCurrentLocation } = useGeolocation();

  useEffect(() => {
    const storedLocation = sessionStorage.getItem('reportLocation');
    if (storedLocation) {
      const locationData: LocationData = JSON.parse(storedLocation);
      setIssueType(locationData.type);
      setLocation(locationData.address);
      sessionStorage.removeItem('reportLocation');
    }
  }, []);

  useEffect(() => {
    if (address) {
      setLocation(address);
    }
  }, [address]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages([...images, ...selectedFiles]);
      
      // Create preview URLs
      const newPreviewImages = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...newPreviewImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviewImages = [...previewImages];
    URL.revokeObjectURL(newPreviewImages[index]);
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAuthenticated && user) {
      addReport({
        locationId: 'temp_id',
        userId: user.id,
        userName: user.name,
        description,
        priority,
        status: 'pending',
        images: previewImages
      });
    }
    
    // Reset form and show success message
    setIssueType('');
    setPriority('medium');
    setDescription('');
    setLocation('');
    setImages([]);
    setPreviewImages([]);
    setSubmitted(true);
    
    // Hide success message after 5 seconds and redirect to dashboard
    setTimeout(() => {
      setSubmitted(false);
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
          <p className="text-gray-600 mt-2">Help us keep San Jose clean and accessible for everyone</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {submitted ? (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your issue has been reported successfully. Our team will review it shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Report Another Issue
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-primary-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Issue Report Form</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-6">
                    {!isAuthenticated && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              You're not logged in. Your report will be submitted anonymously.{' '}
                              <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="font-medium underline"
                              >
                                Log in
                              </button>{' '}
                              to track your reports.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
                          Issue Type *
                        </label>
                        <select
                          id="issueType"
                          value={issueType}
                          onChange={(e) => setIssueType(e.target.value)}
                          required
                          className="input"
                        >
                          <option value="" disabled>Select issue type</option>
                          <option value="trash">Overflowing Trash</option>
                          <option value="restroom">Restroom Issue</option>
                          <option value="menstrual">Menstrual Product Availability</option>
                          <option value="cleanliness">General Cleanliness</option>
                          <option value="other">Other Issue</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priority Level *
                        </label>
                        <div className="flex space-x-4">
                          {(['low', 'medium', 'high'] as const).map((level) => (
                            <label
                              key={level}
                              className={`
                                flex-1 border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-colors
                                ${priority === level
                                  ? level === 'low'
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : level === 'medium'
                                    ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                                    : 'bg-red-50 border-red-500 text-red-700'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }
                              `}
                            >
                              <input
                                type="radio"
                                name="priority"
                                value={level}
                                checked={priority === level}
                                onChange={() => setPriority(level)}
                                className="sr-only"
                              />
                              <span className="capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="input"
                          placeholder="Please provide details about the issue..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="input pl-10 pr-24"
                            placeholder="Enter address or location description"
                          />
                          <button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-1 px-3 text-sm"
                          >
                            {loading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Navigation className="h-4 w-4" />
                            )}
                            <span className="ml-1">Detect</span>
                          </button>
                        </div>
                        {error && (
                          <p className="mt-1 text-sm text-red-600">{error}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Photos (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                          <input
                            type="file"
                            id="photoUpload"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                          <label
                            htmlFor="photoUpload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Camera className="h-12 w-12 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-600">
                              Drag photos here or click to upload
                            </span>
                            <span className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </span>
                          </label>
                        </div>
                        
                        {previewImages.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {previewImages.map((previewUrl, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                                  <img
                                    src={previewUrl}
                                    alt={`Preview ${index}`}
                                    className="w-full h-32 object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                        >
                          Submit Report
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <div className="p-6 space-y-6">
                {[
                  {
                    question: 'What happens after I submit a report?',
                    answer: 'Your report is reviewed by our team and prioritized based on urgency. For high-priority issues, we aim to address them within 24-48 hours.'
                  },
                  {
                    question: 'Can I track the status of my report?',
                    answer: 'Yes, registered users can track the status of their reports in the dashboard. You\'ll also receive email updates when the status changes.'
                  },
                  {
                    question: 'What issues should I report?',
                    answer: 'Report any cleanliness issues in public spaces, overflowing trash bins, restroom maintenance needs, or lack of menstrual product availability.'
                  },
                  {
                    question: 'Are reports anonymous?',
                    answer: 'Reports can be submitted anonymously, but creating an account helps you track the status and communicate with our team if needed.'
                  }
                ].map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-start">
                      <HelpCircle className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-gray-600 pl-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Contact Support</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Need immediate assistance or have questions about the Civic Pulse platform? Our support team is here to help.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Email Support</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:support@civicpulse.org" className="text-primary-600 hover:text-primary-800">
                          support@civicpulse.org
                        </a>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Response time: Within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 rounded-full p-2 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Phone Support</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+14085551234" className="text-primary-600 hover:text-primary-800">
                          (408) 555-1234
                        </a>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Hours: Monday-Friday, 9AM-5PM PT
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="btn btn-primary w-full">
                    Chat with Support
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
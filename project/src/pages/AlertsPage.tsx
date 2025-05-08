import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, ShieldCheck, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'info' | 'warning' | 'critical';
  read: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Flu Season Precautions',
    description: 'Flu season is approaching. Remember to wash your hands frequently and get your annual flu shot to stay protected.',
    date: '2025-03-15T12:30:00Z',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'Restroom Maintenance Notice',
    description: 'The public restrooms at Guadalupe River Park will be undergoing maintenance on March 20-22. Please use alternative facilities during this time.',
    date: '2025-03-14T09:15:00Z',
    type: 'warning',
    read: true
  },
  {
    id: '3',
    title: 'Air Quality Alert',
    description: 'Due to nearby wildfires, air quality in San Jose is currently unhealthy. Limit outdoor activities and wear proper masks if you must go outside.',
    date: '2025-03-13T16:45:00Z',
    type: 'critical',
    read: false
  },
  {
    id: '4',
    title: 'Clean-Up Event This Weekend',
    description: 'Join us for a community clean-up at downtown San Jose this Saturday from 9 AM to 12 PM. Equipment will be provided.',
    date: '2025-03-12T11:20:00Z',
    type: 'info',
    read: true
  },
  {
    id: '5',
    title: 'Menstrual Product Distribution Update',
    description: 'Free menstrual products are now available at all San Jose public libraries. Spread the word to those who may need these resources.',
    date: '2025-03-11T14:30:00Z',
    type: 'info',
    read: false
  }
];

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'email' | 'sms'>('email');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {text: "Hello! I'm the Dignity Hub Health Bot. How can I assist you today?", sender: 'bot'}
  ]);
  const [userInput, setUserInput] = useState('');

  const markAsRead = (id: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionSuccess(true);
    setSubscribed(true);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, {text: userInput, sender: 'user'}]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "";
      
      if (userInput.toLowerCase().includes('flu') || userInput.toLowerCase().includes('cold')) {
        response = "Flu symptoms include fever, cough, sore throat, body aches, and fatigue. To prevent it: wash hands frequently, avoid close contact with sick people, and get your annual flu shot.";
      } else if (userInput.toLowerCase().includes('covid') || userInput.toLowerCase().includes('coronavirus')) {
        response = "COVID-19 symptoms may include fever, cough, shortness of breath, fatigue, body aches, headache, loss of taste or smell, sore throat, congestion, nausea, or diarrhea. Get tested if you have symptoms or were exposed.";
      } else if (userInput.toLowerCase().includes('wash') || userInput.toLowerCase().includes('hand')) {
        response = "Proper handwashing: Use soap and water, scrub for at least 20 seconds, clean between fingers and under nails, rinse thoroughly, and dry with a clean towel.";
      } else {
        response = "I'm not sure I understand your question. Could you please rephrase it? I can help with questions about common illnesses, preventive measures, and hygiene practices.";
      }
      
      setChatMessages(prev => [...prev, {text: response, sender: 'bot'}]);
    }, 1000);
    
    setUserInput('');
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
          <h1 className="text-3xl font-bold text-gray-900">Health & Hygiene Alerts</h1>
          <p className="text-gray-600 mt-2">Stay informed about health concerns and hygiene resources</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
            >
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Alerts</h2>
                <span className="badge bg-primary-100 text-primary-800">
                  {alerts.filter(a => !a.read).length} New
                </span>
              </div>
              
              <div className="divide-y divide-gray-200">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${!alert.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(alert.id)}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 rounded-full p-2 mr-4 ${
                        alert.type === 'info' ? 'bg-blue-100' : 
                        alert.type === 'warning' ? 'bg-yellow-100' : 
                        'bg-red-100'
                      }`}>
                        {alert.type === 'info' ? (
                          <Info className={`h-5 w-5 text-blue-600`} />
                        ) : alert.type === 'warning' ? (
                          <AlertTriangle className={`h-5 w-5 text-yellow-600`} />
                        ) : (
                          <XCircle className={`h-5 w-5 text-red-600`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(alert.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{alert.description}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.type === 'info' ? 'bg-blue-100 text-blue-800' : 
                            alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {alert.type === 'info' ? 'Information' : 
                             alert.type === 'warning' ? 'Warning' : 
                             'Critical'}
                          </span>
                          {!alert.read && (
                            <span className="inline-flex items-center text-xs font-medium text-blue-600">
                              <Bell className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
            >
              <div className="bg-primary-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Alert Subscription
                </h2>
              </div>
              
              {subscriptionSuccess ? (
                <div className="p-6">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          You've successfully subscribed to health alerts!
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    You will now receive important health and hygiene alerts via {preferredChannel === 'email' ? 'email' : 'SMS'}.
                  </p>
                  <button 
                    onClick={() => setSubscriptionSuccess(false)}
                    className="btn btn-outline w-full"
                  >
                    Update Subscription
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="p-6">
                  <p className="text-gray-600 mb-4">
                    Stay informed about important health issues, cleanliness alerts, and community resources.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notification Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={preferredChannel === 'email'}
                            onChange={() => setPreferredChannel('email')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700 flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={preferredChannel === 'sms'}
                            onChange={() => setPreferredChannel('sms')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            SMS
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {preferredChannel === 'email' ? (
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="input"
                          placeholder="you@example.com"
                        />
                      </div>
                    ) : (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="input"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          I agree to receive alerts about health issues and hygiene resources.
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Subscribe to Alerts
                  </button>
                </form>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold">Health Support Bot</h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Have questions about common health issues or hygiene practices? Our bot can help provide guidance.
                </p>
                
                {chatbotOpen ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-primary-600 text-white px-4 py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 mr-2" />
                        <span className="font-medium">Health Support Bot</span>
                      </div>
                      <button 
                        onClick={() => setChatbotOpen(false)}
                        className="text-white hover:text-gray-200"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="h-64 bg-gray-50 p-4 overflow-y-auto">
                      {chatMessages.map((message, index) => (
                        <div 
                          key={index}
                          className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[75%] rounded-xl px-3 py-2 ${
                            message.sender === 'user' 
                              ? 'bg-primary-500 text-white rounded-br-none' 
                              : 'bg-white border border-gray-200 rounded-bl-none'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleChatSubmit} className="flex border-t border-gray-200 p-2">
                      <input
                        type="text"
                        className="flex-1 input border-none focus:ring-0"
                        placeholder="Type your health question..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ml-2 bg-primary-600 text-white rounded-lg p-2 hover:bg-primary-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                ) : (
                  <button
                    onClick={() => setChatbotOpen(true)}
                    className="btn btn-primary w-full"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Chat with Health Bot
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
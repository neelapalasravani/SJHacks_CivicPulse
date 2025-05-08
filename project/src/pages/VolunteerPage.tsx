import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Gift, Users, Award, Filter, Check, Search, XCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVolunteer } from '../contexts/VolunteerContext';
import { useNavigate } from 'react-router-dom';
import { mockVolunteerEvents, getUpcomingEvents, getEventsByCategory, VolunteerEvent } from '../data/mockVolunteerEvents';

const VolunteerPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cleanup' | 'education' | 'distribution'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { registerForEvent, unregisterFromEvent, isRegistered } = useVolunteer();
  const navigate = useNavigate();
  
  const upcomingEvents = getUpcomingEvents();
  
  const filteredEvents = selectedCategory === 'all'
    ? upcomingEvents
    : getEventsByCategory(selectedCategory);
    
  const searchFilteredEvents = searchQuery
    ? filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredEvents;

  const handleRegister = (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    registerForEvent(eventId);
    setShowRegistrationSuccess(true);
    
    setTimeout(() => {
      setShowRegistrationSuccess(false);
    }, 3000);
  };

  const handleUnregister = (eventId: string) => {
    unregisterFromEvent(eventId);
  };

  const isEventFull = (event: VolunteerEvent) => {
    return event.registeredUsers?.length >= event.maxParticipants;
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
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Opportunities</h1>
          <p className="text-gray-600 mt-2">Join our community efforts and make a difference in San Jose</p>
        </motion.div>

        {showRegistrationSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-green-100 border-l-4 border-green-500 p-4 rounded-md shadow-md"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800 font-medium">
                  Registration Successful!
                </p>
                <p className="text-xs text-green-700 mt-1">
                  You have been registered for the event. Check your email for details.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <h2 className="text-xl font-bold">Upcoming Volunteer Events</h2>
                  
                  <div className="flex space-x-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                        className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Categories</option>
                        <option value="cleanup">Clean-Up Events</option>
                        <option value="education">Education Events</option>
                        <option value="distribution">Distribution Events</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Filter className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {searchFilteredEvents.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No events found</h3>
                  <p className="text-gray-600">
                    No upcoming events match your search criteria. Please try a different search.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {searchFilteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="mt-3 flex justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.category === 'cleanup' ? 'bg-green-100 text-green-800' : 
                              event.category === 'education' ? 'bg-blue-100 text-blue-800' : 
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {event.category === 'cleanup' ? 'Clean-Up' : 
                              event.category === 'education' ? 'Education' : 
                              'Distribution'}
                            </span>
                            <span className="inline-flex items-center text-xs font-medium text-gray-600">
                              <Users className="h-3 w-3 mr-1" />
                              {event.registeredUsers?.length || 0}/{event.maxParticipants}
                            </span>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-gray-500">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Gift className="h-4 w-4 mr-2" />
                              <span className="text-sm">{event.pointsEarned} Points</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <div>
                              {isEventFull(event) && !isRegistered(event.id) ? (
                                <span className="inline-flex items-center text-sm font-medium text-red-500">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Event is full
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-sm font-medium text-green-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  Spots available
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {isRegistered(event.id) ? (
                                <>
                                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Registered
                                  </span>
                                  <button
                                    onClick={() => handleUnregister(event.id)}
                                    className="text-gray-500 hover:text-gray-700 hover:underline text-sm"
                                  >
                                    Unregister
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleRegister(event.id)}
                                  disabled={isEventFull(event) || !isAuthenticated}
                                  className={`btn px-4 py-2 ${
                                    isEventFull(event) || !isAuthenticated
                                      ? 'bg-gray-100 text-gray-500 hover:bg-gray-100 cursor-not-allowed'
                                      : 'btn-primary'
                                  }`}
                                >
                                  {isEventFull(event)
                                    ? 'Event Full'
                                    : !isAuthenticated
                                    ? 'Log in to Register'
                                    : 'Register Now'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="bg-primary-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Volunteer Rewards
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Earn points by participating in volunteer activities. Redeem your points for rewards or certificates.
                </p>
                
                <div className="space-y-5">
                  {[
                    { points: 50, reward: 'Digital Badge of Appreciation' },
                    { points: 100, reward: 'Dignity Hub T-shirt' },
                    { points: 200, reward: '$20 Amazon Gift Card' },
                    { points: 350, reward: '$50 Amazon Gift Card' },
                    { points: 500, reward: 'Volunteer Leadership Certificate' }
                  ].map((reward, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 rounded-full w-10 h-10 flex items-center justify-center ${
                          user && user.points >= reward.points ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                          <span className={`text-sm font-bold ${
                            user && user.points >= reward.points ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {reward.points}
                          </span>
                        </div>
                        <span className="ml-3 font-medium">{reward.reward}</span>
                      </div>
                      
                      {user && user.points >= reward.points ? (
                        <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                          Redeem
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">
                          {user 
                            ? `${reward.points - (user.points || 0)} more points needed` 
                            : 'Log in to track points'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                {isAuthenticated ? (
                  <div className="mt-6 bg-primary-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Your Points</span>
                      <span className="text-xl font-bold text-primary-600">{user?.points || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(100, ((user?.points || 0) / 500) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 text-right">
                      {500 - (user?.points || 0)} points until Volunteer Leadership Certificate
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
                    <p className="text-gray-600 mb-3">Log in to track your volunteer points and redeem rewards</p>
                    <button className="btn btn-primary text-sm py-2 px-4">
                      Log In to Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Why Volunteer With Us?</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      title: 'Make a Visible Impact',
                      description: 'Your volunteer work directly improves the cleanliness and dignity of the San Jose community.'
                    },
                    {
                      title: 'Flexible Opportunities',
                      description: 'Choose from a variety of volunteer events that fit your schedule and interests.'
                    },
                    {
                      title: 'Earn Rewards',
                      description: 'Gain points for your participation that can be redeemed for tangible rewards.'
                    },
                    {
                      title: 'Develop Skills',
                      description: 'Gain experience in community organizing, education, and environmental stewardship.'
                    }
                  ].map((benefit, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                        <p className="mt-1 text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
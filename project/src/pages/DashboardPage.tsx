import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, AlertCircle, PlusCircle, MapPin, Calendar, User, Edit } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVolunteer } from '../contexts/VolunteerContext';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { volunteerEventCount, registeredEventDetails } = useVolunteer();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'rewards' | 'profile'>('overview');
  
  // Mock data for user reports
  const userReports = [
    {
      id: 'rep1',
      title: 'Overflowing Trash Bin',
      location: 'W Santa Clara St & N Market St',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-03-14T09:30:00Z',
      description: 'Trash bin is overflowing and needs immediate attention.'
    },
    {
      id: 'rep2',
      title: 'Restroom Out of Supplies',
      location: 'Plaza de César Chávez',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2025-03-10T14:15:00Z',
      description: 'No paper towels or soap available in the public restroom.'
    }
  ];
  
  // Mock data for user volunteer history
  const volunteerHistory = [
    {
      id: 'vol1',
      title: 'Downtown San Jose Cleanup',
      date: '2025-02-15',
      hours: 3,
      points: 75,
      location: 'Plaza de César Chávez'
    },
    {
      id: 'vol2',
      title: 'Hygiene Education Workshop',
      date: '2025-03-01',
      hours: 2,
      points: 50,
      location: 'Dr. Martin Luther King Jr. Library'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your volunteer activity and issue reports</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-500 mb-4">{user?.email}</p>
                
                <div className="bg-primary-50 rounded-xl p-3 w-full flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Total Points</span>
                  <span className="text-primary-600 font-bold text-2xl">{user?.points}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <nav className="flex flex-col">
                  {[
                    { id: 'overview', name: 'Overview', icon: <Clock className="h-5 w-5" /> },
                    { id: 'reports', name: 'My Reports', icon: <AlertCircle className="h-5 w-5" /> },
                    { id: 'rewards', name: 'Rewards', icon: <Award className="h-5 w-5" /> },
                    { id: 'profile', name: 'Profile', icon: <User className="h-5 w-5" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${
                        activeTab === item.id ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Issue Reports', value: userReports.length, icon: <AlertCircle className="text-red-500" /> },
                    { title: 'Volunteer Events', value: volunteerEventCount, icon: <Calendar className="text-green-500" /> },
                    { title: 'Points Earned', value: user?.points || 0, icon: <Award className="text-amber-500" /> }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-700 font-medium">{stat.title}</h3>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                  </div>
                  
                  <div className="p-6">
                    {registeredEventDetails.length > 0 ? (
                      <div className="space-y-4">
                        {registeredEventDetails.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gray-50 rounded-xl p-4"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                <div className="flex items-center text-gray-500 mt-1 text-sm">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{event.date} • {event.time}</span>
                                </div>
                                <div className="flex items-center text-gray-500 mt-1 text-sm">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                              <Link
                                to="/volunteer"
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                              >
                                View Details
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No upcoming events</h3>
                        <p className="text-gray-600 mb-4">
                          You haven't registered for any upcoming volunteer events yet.
                        </p>
                        <Link to="/volunteer" className="btn btn-primary">
                          Browse Events
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-xl font-bold">Recent Reports</h2>
                      <button
                        onClick={() => setActiveTab('reports')}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        View All
                      </button>
                    </div>
                    
                    <div className="p-4">
                      {userReports.slice(0, 2).map((report, index) => (
                        <div key={report.id} className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{report.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {report.status === 'pending' ? 'Pending' :
                               report.status === 'in-progress' ? 'In Progress' :
                               'Resolved'}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-1 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{report.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-xl font-bold">Volunteer History</h2>
                      <button
                        onClick={() => setActiveTab('rewards')}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        View All
                      </button>
                    </div>
                    
                    <div className="p-4">
                      {volunteerHistory.map((event, index) => (
                        <div key={event.id} className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                          <h3 className="font-semibold">{event.title}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{event.date}</span>
                            </div>
                            <span className="text-primary-600 text-sm font-medium">+{event.points} points</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reports' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold">My Issue Reports</h2>
                  <button className="btn btn-primary text-sm py-2 flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Report
                  </button>
                </div>
                
                {userReports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Issue
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userReports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{report.description.substring(0, 30)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{report.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {report.status === 'pending' ? 'Pending' :
                                 report.status === 'in-progress' ? 'In Progress' :
                                 'Resolved'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                report.priority === 'high' ? 'bg-red-100 text-red-800' :
                                report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                              <button className="text-gray-600 hover:text-gray-900">Track</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No reports yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't submitted any issue reports yet. Help keep San Jose clean by reporting any issues you encounter.
                    </p>
                    <button className="btn btn-primary">
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Report an Issue
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'rewards' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Your Rewards</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-700">Points Progress</h3>
                        <span className="text-primary-600 font-bold">{user?.points} / 500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(100, ((user?.points || 0) / 500) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Keep volunteering to earn the Volunteer Leadership Certificate
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { name: 'Digital Badge of Appreciation', points: 50, claimed: true },
                        { name: 'Dignity Hub T-shirt', points: 100, claimed: true },
                        { name: '$20 Amazon Gift Card', points: 200, claimed: false },
                        { name: '$50 Amazon Gift Card', points: 350, claimed: false },
                        { name: 'Volunteer Leadership Certificate', points: 500, claimed: false }
                      ].map((reward, index) => (
                        <div key={index} className="border rounded-xl p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              (user?.points || 0) >= reward.points
                                ? reward.claimed ? 'bg-green-100' : 'bg-primary-100'
                                : 'bg-gray-100'
                            }`}>
                              <Award className={`h-5 w-5 ${
                                (user?.points || 0) >= reward.points
                                  ? reward.claimed ? 'text-green-600' : 'text-primary-600'
                                  : 'text-gray-400'
                              }`} />
                            </div>
                            <div className="ml-4">
                              <p className="font-medium text-gray-900">{reward.name}</p>
                              <p className="text-sm text-gray-500">{reward.points} points required</p>
                            </div>
                          </div>
                          
                          {reward.claimed ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              Claimed
                            </span>
                          ) : (user?.points || 0) >= reward.points ? (
                            <button className="btn btn-primary text-sm py-1.5 px-4">
                              Claim Reward
                            </button>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {reward.points - (user?.points || 0)} points to go
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Volunteer History</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Event
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points Earned
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {volunteerHistory.map((event) => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{event.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{event.location}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {event.hours} hours
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-primary-600 font-medium">+{event.points}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Profile Settings</h2>
                </div>
                
                <div className="p-6">
                  <form>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex-1">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            className="input"
                            defaultValue={user?.name.split(' ')[0]}
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            className="input"
                            defaultValue={user?.name.split(' ')[1] || ''}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="input"
                          defaultValue={user?.email}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="input"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Communication Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              id="emailNotifications"
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="emailNotifications" className="ml-3 text-sm text-gray-700">
                              Email Notifications
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="smsNotifications"
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="smsNotifications" className="ml-3 text-sm text-gray-700">
                              SMS Notifications
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="eventReminders"
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="eventReminders" className="ml-3 text-sm text-gray-700">
                              Event Reminders
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                          <button type="button" className="btn btn-outline mb-3 sm:mb-0">
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary">
                            <Edit className="h-4 w-4 mr-2" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
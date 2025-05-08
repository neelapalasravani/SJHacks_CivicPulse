import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Users, 
  Trash2, 
  MapPin, 
  AlertCircle, 
  Check, 
  Clock, 
  Ban,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { mockReports, getPendingReportsCount } from '../data/mockReports';
import { mockLocations } from '../data/mockLocations';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'locations' | 'users'>('overview');
  const [reportFilter, setReportFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const pendingReportsCount = getPendingReportsCount();
  const totalLocations = mockLocations.length;
  const criticalLocations = mockLocations.filter(loc => loc.status === 'critical').length;
  
  // Filtered reports based on status and search
  const filteredReports = mockReports
    .filter(report => reportFilter === 'all' || report.status === reportFilter)
    .filter(report => 
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStatusChange = (reportId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    // In a real app, this would update the report status in the backend
    console.log(`Changing status of report ${reportId} to ${newStatus}`);
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage reports, locations, and users</p>
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
                  <Users className="h-12 w-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-500 mb-4">Administrator</p>
                
                <div className="bg-error-50 rounded-xl p-3 w-full flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Pending Reports</span>
                  <span className="text-error-600 font-bold text-2xl">{pendingReportsCount}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                <nav className="flex flex-col">
                  {[
                    { id: 'overview', name: 'Dashboard Overview', icon: <BarChart className="h-5 w-5" /> },
                    { id: 'reports', name: 'Issue Reports', icon: <AlertCircle className="h-5 w-5" /> },
                    { id: 'locations', name: 'Locations', icon: <MapPin className="h-5 w-5" /> },
                    { id: 'users', name: 'User Management', icon: <Users className="h-5 w-5" /> }
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
                    { 
                      title: 'Pending Reports', 
                      value: pendingReportsCount, 
                      icon: <AlertCircle className="h-8 w-8 text-error-500" />,
                      color: 'bg-error-50',
                      link: { text: 'View Reports', action: () => setActiveTab('reports') }
                    },
                    { 
                      title: 'Total Locations', 
                      value: totalLocations, 
                      icon: <MapPin className="h-8 w-8 text-primary-500" />,
                      color: 'bg-primary-50',
                      link: { text: 'Manage Locations', action: () => setActiveTab('locations') }
                    },
                    { 
                      title: 'Critical Status', 
                      value: criticalLocations, 
                      icon: <Trash2 className="h-8 w-8 text-yellow-500" />,
                      color: 'bg-yellow-50',
                      link: { text: 'View Critical', action: () => setActiveTab('locations') }
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className={`${stat.color} rounded-2xl shadow-md p-6`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-700 font-medium">{stat.title}</p>
                          <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl">
                          {stat.icon}
                        </div>
                      </div>
                      <button
                        onClick={stat.link.action}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium mt-4 flex items-center"
                      >
                        {stat.link.text}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Recent Issue Reports</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Issue
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reported By
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockReports.slice(0, 5).map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{report.description.substring(0, 30)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{report.userName}</div>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="px-6 py-3 border-t border-gray-200 text-center">
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      View All Reports
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold">Location Status</h2>
                    </div>
                    
                    <div className="p-6">
                      {[
                        { status: 'Good', count: mockLocations.filter(l => l.status === 'good').length, color: 'bg-success-500' },
                        { status: 'Needs Attention', count: mockLocations.filter(l => l.status === 'needs-attention').length, color: 'bg-warning-500' },
                        { status: 'Critical', count: mockLocations.filter(l => l.status === 'critical').length, color: 'bg-error-500' }
                      ].map((status, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">{status.status}</span>
                            <span className="text-sm font-medium">{status.count} locations</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`${status.color} h-2.5 rounded-full`}
                              style={{ width: `${(status.count / totalLocations) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-bold">Location Types</h2>
                    </div>
                    
                    <div className="p-6">
                      {[
                        { type: 'Public Restrooms', count: mockLocations.filter(l => l.type === 'restroom').length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 8l-3.293-3.293A1 1 0 0112 4z" clipRule="evenodd" />
                        </svg> },
                        { type: 'Trash Bins', count: mockLocations.filter(l => l.type === 'trash').length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg> },
                        { type: 'Menstrual Products', count: mockLocations.filter(l => l.type === 'menstrual').length, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg> }
                      ].map((type, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              {type.icon}
                            </div>
                            <span className="font-medium">{type.type}</span>
                          </div>
                          <span className="text-xl font-bold text-gray-900">{type.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reports' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-bold">Issue Reports</h2>
                    
                    <div className="flex space-x-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Search reports..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative">
                        <select
                          value={reportFilter}
                          onChange={(e) => setReportFilter(e.target.value as any)}
                          className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="all">All Reports</option>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {filteredReports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Issue Details
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reporter
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-start">
                                <div className={`mr-3 flex-shrink-0 w-3 h-3 rounded-full mt-1.5 ${
                                  report.priority === 'high' ? 'bg-red-500' :
                                  report.priority === 'medium' ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}></div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{report.description}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Location ID: {report.locationId}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{report.userName}</div>
                              <div className="text-xs text-gray-500">User ID: {report.userId}</div>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {report.status !== 'in-progress' && (
                                  <button
                                    onClick={() => handleStatusChange(report.id, 'in-progress')}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Mark as in progress"
                                  >
                                    <Clock className="h-5 w-5" />
                                  </button>
                                )}
                                
                                {report.status !== 'resolved' && (
                                  <button
                                    onClick={() => handleStatusChange(report.id, 'resolved')}
                                    className="text-green-600 hover:text-green-900"
                                    title="Mark as resolved"
                                  >
                                    <Check className="h-5 w-5" />
                                  </button>
                                )}
                                
                                <button
                                  className="text-gray-600 hover:text-gray-900"
                                  title="View details"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No reports found</h3>
                    <p className="text-gray-600">
                      No reports match your current filter settings. Try adjusting your filters or search query.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'locations' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">Location Management</h2>
                      <button className="btn btn-primary text-sm py-2">
                        Add New Location
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mockLocations.map((location, index) => (
                        <div
                          key={location.id}
                          className={`border rounded-xl overflow-hidden hover:shadow-md transition-shadow ${
                            location.status === 'critical' ? 'border-red-300' :
                            location.status === 'needs-attention' ? 'border-yellow-300' :
                            'border-green-300'
                          }`}
                        >
                          <div className={`px-4 py-2 text-sm font-medium ${
                            location.status === 'critical' ? 'bg-red-50 text-red-700' :
                            location.status === 'needs-attention' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-green-50 text-green-700'
                          }`}>
                            {location.type === 'restroom' ? 'Public Restroom' :
                             location.type === 'trash' ? 'Trash Bin' :
                             'Menstrual Products'}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                            <p className="text-sm text-gray-500 mb-3">{location.address}</p>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-xs">
                                Last checked: {new Date(location.lastChecked).toLocaleDateString()}
                              </div>
                              
                              <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                                Manage
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">User Management</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reports
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', points: 250, reports: 0, joined: '2024-12-01' },
                          { id: '2', name: 'Regular User', email: 'user@example.com', role: 'user', points: 125, reports: 2, joined: '2025-01-15' },
                          { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'user', points: 75, reports: 1, joined: '2025-02-03' },
                          { id: '4', name: 'Alex Johnson', email: 'alex@example.com', role: 'user', points: 50, reports: 1, joined: '2025-02-10' },
                          { id: '5', name: 'Maria Garcia', email: 'maria@example.com', role: 'user', points: 150, reports: 1, joined: '2025-01-05' }
                        ].map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                  <span className="text-primary-600 font-medium">{user.name.charAt(0)}</span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.points} points
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.joined}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.reports}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-primary-600 hover:text-primary-900">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Ban className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Bath, Trash2, HeartPulse, Star, MapPin } from 'lucide-react';
import { getLocationsByType, getLocationById } from '../data/mockLocations';
import { Location, LocationType } from '../types/Location';
import ReportButton from '../components/map/ReportButton';

// Helper component to update map view when markers change
const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const getIconForType = (type: LocationType, status: string) => {
  let bgColor = '';
  let iconSvg = '';
  
  // Set color based on status
  if (status === 'good') {
    bgColor = 'bg-success-500';
  } else if (status === 'needs-attention') {
    bgColor = 'bg-warning-500';
  } else {
    bgColor = 'bg-error-500';
  }
  
  // Set icon SVG based on type
  if (type === 'restroom') {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6 6l0 12"/><path d="M18 6c-2.21 0-4 1.79-4 4v10"/><path d="M6 12h12"/></svg>';
  } else if (type === 'trash') {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>';
  } else {
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
  }
  
  const customIcon = L.divIcon({
    className: 'marker-icon',
    html: `<div class="${bgColor} h-full w-full rounded-full flex items-center justify-center">${iconSvg}</div>`,
    iconSize: [25, 25],
  });
  
  return customIcon;
};

const MapPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<LocationType>('restroom');
  const [locations, setLocations] = useState<Location[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([37.335480, -121.893028]); // San Jose center
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  useEffect(() => {
    const fetchLocations = () => {
      const data = getLocationsByType(selectedType);
      setLocations(data);
    };
    
    fetchLocations();
  }, [selectedType]);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
    setMapCenter([location.latitude, location.longitude]);
    if (location.cleanliness) {
      setRating(location.cleanliness);
    }
  };

  const handleTypeChange = (type: LocationType) => {
    setSelectedType(type);
    setSelectedLocation(null);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    // In a real app, this would submit the rating to a backend
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
          <h1 className="text-3xl font-bold text-gray-900">Interactive Resource Map</h1>
          <p className="text-gray-600 mt-2">Find essential resources across San Jose</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="px-4 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
                  <button
                    onClick={() => handleTypeChange('restroom')}
                    className={`flex items-center justify-center sm:justify-start px-4 py-2 rounded-xl ${
                      selectedType === 'restroom'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors duration-200 w-full sm:w-auto`}
                  >
                    <Bath className="h-5 w-5 mr-2" />
                    Public Restrooms
                  </button>
                  <button
                    onClick={() => handleTypeChange('trash')}
                    className={`flex items-center justify-center sm:justify-start px-4 py-2 rounded-xl ml-0 sm:ml-3 ${
                      selectedType === 'trash'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors duration-200 w-full sm:w-auto`}
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Trash Bins
                  </button>
                  <button
                    onClick={() => handleTypeChange('menstrual')}
                    className={`flex items-center justify-center sm:justify-start px-4 py-2 rounded-xl ml-0 sm:ml-3 ${
                      selectedType === 'menstrual'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors duration-200 w-full sm:w-auto`}
                  >
                    <HeartPulse className="h-5 w-5 mr-2" />
                    Menstrual Products
                  </button>
                </div>
              </div>
              
              <div className="h-[500px]">
                <MapContainer 
                  center={mapCenter} 
                  zoom={13} 
                  scrollWheelZoom={true} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <ChangeView center={mapCenter} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {locations.map(location => (
                    <Marker
                      key={location.id}
                      position={[location.latitude, location.longitude]}
                      icon={getIconForType(location.type, location.status)}
                      eventHandlers={{
                        click: () => handleMarkerClick(location),
                      }}
                    >
                      <Popup>
                        <div className="popup-content">
                          <h3 className="font-semibold">{location.name}</h3>
                          <p className="text-sm text-gray-600">{location.address}</p>
                          
                          {location.status === 'good' && (
                            <div className="mt-2 inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              Good condition
                            </div>
                          )}
                          
                          {location.status === 'needs-attention' && (
                            <div className="mt-2 inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Needs attention
                            </div>
                          )}
                          
                          {location.status === 'critical' && (
                            <div className="mt-2 inline-flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              Critical
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-6">
              {selectedLocation ? (
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                    <div 
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium 
                        ${selectedLocation.status === 'good' ? 'bg-green-100 text-green-800' : 
                          selectedLocation.status === 'needs-attention' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}
                      `}
                    >
                      {selectedLocation.status === 'good' ? 'Good' : 
                       selectedLocation.status === 'needs-attention' ? 'Needs Attention' : 
                       'Critical'}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <p className="text-sm">{selectedLocation.address}</p>
                  </div>
                  
                  {selectedLocation.description && (
                    <p className="mt-4 text-gray-700">{selectedLocation.description}</p>
                  )}
                  
                  {selectedLocation.type === 'restroom' && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Cleanliness Rating</h3>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 star ${
                              star <= (hoveredStar || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            onClick={() => handleRatingChange(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {rating > 0 ? `${rating}/5` : 'Rate this location'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {selectedLocation.images && selectedLocation.images.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Latest Images</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedLocation.images.map((img, index) => (
                          <div key={index} className="rounded-lg overflow-hidden">
                            <img src={img} alt={`Location image ${index + 1}`} className="w-full h-32 object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Last Checked</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedLocation.lastChecked).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <ReportButton location={selectedLocation} />
                    <button className="btn btn-outline text-sm py-2">
                      Get Directions
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Location</h3>
                  <p className="text-gray-600">
                    Click on a map marker to view details about that location.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Map Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Good Condition</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-warning-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Needs Attention</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-error-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
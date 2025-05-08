import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { VolunteerEvent, getEventById } from '../data/mockVolunteerEvents';

interface VolunteerContextType {
  registeredEvents: string[];
  registeredEventDetails: VolunteerEvent[];
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
  volunteerEventCount: number;
}

const VolunteerContext = createContext<VolunteerContextType>({
  registeredEvents: [],
  registeredEventDetails: [],
  registerForEvent: () => {},
  unregisterFromEvent: () => {},
  isRegistered: () => false,
  volunteerEventCount: 1,
});

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};

export const VolunteerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [registeredEventDetails, setRegisteredEventDetails] = useState<VolunteerEvent[]>([]);
  const [volunteerEventCount, setVolunteerEventCount] = useState(1);

  useEffect(() => {
    if (isAuthenticated && user) {
      const storedEvents = localStorage.getItem(`registeredEvents_${user.id}`);
      if (storedEvents) {
        const events = JSON.parse(storedEvents);
        setRegisteredEvents(events);
        setVolunteerEventCount(events.length + 1);
        
        // Load event details
        const details = events
          .map(id => getEventById(id))
          .filter((event): event is VolunteerEvent => event !== undefined)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setRegisteredEventDetails(details);
      }
    }
  }, [isAuthenticated, user]);

  const registerForEvent = (eventId: string) => {
    if (isAuthenticated && user) {
      const newRegisteredEvents = [...registeredEvents, eventId];
      setRegisteredEvents(newRegisteredEvents);
      localStorage.setItem(`registeredEvents_${user.id}`, JSON.stringify(newRegisteredEvents));
      setVolunteerEventCount(newRegisteredEvents.length + 1);
      
      const eventDetails = getEventById(eventId);
      if (eventDetails) {
        setRegisteredEventDetails(prev => 
          [...prev, eventDetails].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        );
      }
    }
  };

  const unregisterFromEvent = (eventId: string) => {
    if (isAuthenticated && user) {
      const newRegisteredEvents = registeredEvents.filter(id => id !== eventId);
      setRegisteredEvents(newRegisteredEvents);
      localStorage.setItem(`registeredEvents_${user.id}`, JSON.stringify(newRegisteredEvents));
      setVolunteerEventCount(newRegisteredEvents.length + 1);
      
      setRegisteredEventDetails(prev => 
        prev.filter(event => event.id !== eventId)
      );
    }
  };

  const isRegistered = (eventId: string) => {
    return registeredEvents.includes(eventId);
  };

  return (
    <VolunteerContext.Provider 
      value={{ 
        registeredEvents, 
        registeredEventDetails,
        registerForEvent, 
        unregisterFromEvent, 
        isRegistered,
        volunteerEventCount
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};
export interface VolunteerEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  pointsEarned: number;
  image: string;
  registeredUsers: string[];
  maxParticipants: number;
  category: 'cleanup' | 'education' | 'distribution';
}

export const mockVolunteerEvents: VolunteerEvent[] = [
  {
    id: 'event4',
    title: 'Guadalupe River Park Cleanup',
    description: 'Join our effort to clean up Guadalupe River Park. We\'ll be removing trash from the river and surrounding areas.',
    date: '2025-04-29',
    time: '8:30 AM - 11:30 AM',
    location: 'Guadalupe River Park',
    address: 'W Santa Clara St, San Jose, CA 95113',
    pointsEarned: 75,
    image: 'https://images.pexels.com/photos/6647175/pexels-photo-6647175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredUsers: [],
    maxParticipants: 25,
    category: 'cleanup'
  },
  {
    id: 'event5',
    title: 'Community Education Workshop',
    description: 'Help us organize a workshop to provide essential learning skills to underserved communities in San Jose.',
    date: '2025-05-03',
    time: '10:00 AM - 1:00 PM',
    location: 'San Jose Public Library',
    address: '150 E San Fernando St, San Jose, CA 95112',
    pointsEarned: 100,
    image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredUsers: [],
    maxParticipants: 20,
    category: 'education'
  },
  {
    id: 'event6',
    title: 'Food Distribution Drive',
    description: 'Join hands to distribute food packages to families in need across downtown San Jose.',
    date: '2025-05-10',
    time: '11:00 AM - 2:00 PM',
    location: 'Downtown San Jose Community Center',
    address: '200 E Santa Clara St, San Jose, CA 95113',
    pointsEarned: 80,
    image: 'https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredUsers: [],
    maxParticipants: 30,
    category: 'distribution'
  },
  {
    id: 'event7',
    title: 'Clothes Donation and Distribution',
    description: 'Help us collect and distribute clothing items to low-income families and shelters in San Jose.',
    date: '2025-05-18',
    time: '9:00 AM - 12:00 PM',
    location: 'San Jose Civic Center',
    address: '200 E Santa Clara St, San Jose, CA 95113',
    pointsEarned: 85,
    image: 'https://images.pexels.com/photos/7319324/pexels-photo-7319324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registeredUsers: [],
    maxParticipants: 25,
    category: 'distribution'
  }
];

export const getUpcomingEvents = (): VolunteerEvent[] => {
  const today = new Date();
  return mockVolunteerEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });
};

export const getEventById = (id: string): VolunteerEvent | undefined => {
  return mockVolunteerEvents.find(event => event.id === id);
};

export const getEventsByCategory = (category: 'cleanup' | 'education' | 'distribution'): VolunteerEvent[] => {
  return mockVolunteerEvents.filter(event => event.category === category);
};
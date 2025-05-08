import { Report } from '../types/Location';

export const mockReports: Report[] = [
  {
    id: 'rep1',
    locationId: 't2',
    userId: '2',
    userName: 'Regular User',
    description: 'Trash bin is overflowing and needs immediate attention. There is litter spreading to nearby areas.',
    priority: 'high',
    status: 'pending',
    images: ['https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    createdAt: '2025-03-14T09:30:00Z'
  },
  {
    id: 'rep2',
    locationId: 'r3',
    userId: '3',
    userName: 'Jane Smith',
    description: 'Restroom is out of paper towels and soap dispenser is broken. Needs maintenance.',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2025-03-13T14:45:00Z'
  },
  {
    id: 'rep3',
    locationId: 'm2',
    userId: '4',
    userName: 'Alex Johnson',
    description: 'Menstrual product dispenser is almost empty. Please refill.',
    priority: 'low',
    status: 'pending',
    createdAt: '2025-03-15T11:20:00Z'
  },
  {
    id: 'rep4',
    locationId: 't3',
    userId: '5',
    userName: 'Maria Garcia',
    description: 'Trash bin is starting to fill up and may need service soon.',
    priority: 'low',
    status: 'resolved',
    createdAt: '2025-03-12T16:10:00Z',
    resolvedAt: '2025-03-13T09:20:00Z'
  },
  {
    id: 'rep5',
    locationId: 't2',
    userId: '6',
    userName: 'David Wong',
    description: 'Still overflowing. This needs to be addressed ASAP as it\'s attracting pests.',
    priority: 'high',
    status: 'pending',
    createdAt: '2025-03-14T15:05:00Z'
  }
];

export const getReportsByLocationId = (locationId: string): Report[] => {
  return mockReports.filter(report => report.locationId === locationId);
};

export const getReportsByStatus = (status: 'pending' | 'in-progress' | 'resolved'): Report[] => {
  return mockReports.filter(report => report.status === status);
};

export const getPendingReportsCount = (): number => {
  return mockReports.filter(report => report.status === 'pending').length;
};
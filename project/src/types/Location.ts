export type LocationType = 'restroom' | 'trash' | 'menstrual';

export interface Location {
  id: string;
  type: LocationType;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  status: 'good' | 'needs-attention' | 'critical';
  cleanliness?: number; // 1-5 stars
  lastChecked: string;
  reportCount?: number;
  available?: boolean;
  images?: string[];
  description?: string;
}

export interface Report {
  id: string;
  locationId: string;
  userId: string;
  userName: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  images?: string[];
  createdAt: string;
  resolvedAt?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  points: number;
  issuedReports: string[];
  createdAt: string;
}
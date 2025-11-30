export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  tourId: number;
  tourName: string;
  date: string;
  participants: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookedAt: string;
  fullName: string;
  email: string;
  phone: string;
  comments?: string;
  distance?: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  tourId: number;
  tourName: string;
  rating: number;
  comment: string;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Achievement {
  id: string;
  type: 'peaks' | 'distance';
  level: number;
  nameKey: string;
  descriptionKey: string;
  iconKey: string;
  requirement: number;
  unlockedAt?: string;
}

export interface UserStats {
  totalTours: number;
  completedPeaks: number;
  totalDistance: number;
  achievements: Achievement[];
}

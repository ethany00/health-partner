export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  bio?: string;
  fitnessGoals?: string[];
  preferredWorkoutTime?: string;
  location?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedUser: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
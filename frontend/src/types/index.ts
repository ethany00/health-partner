export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const Career = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  PRO: 'PRO',
} as const;
export type Career = (typeof Career)[keyof typeof Career];

export interface User {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  bio?: string;
  region?: string;
  gender?: Gender;
  age?: number;
  career?: Career;
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
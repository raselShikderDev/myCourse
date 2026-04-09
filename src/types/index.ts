export interface Course {
  id: number;
  title: string;
  description?: string;
  categoryId: number;
  price?: number;
  durationHours?: number;
  lectures?: number;
  startAt?: string;
  endAt?: string;
  thumbnailPath?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  paymentDate?: string;
  paymentStatus?: number;
  status?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  isActive: boolean;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}
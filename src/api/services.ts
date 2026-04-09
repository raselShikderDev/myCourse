import api from './axios';
import { handleResponse } from '../utils/response';
import { Course, Category, Enrollment, User } from '../types';

// Auth
export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return handleResponse<{ token: string; user: User }>(res);
  },
  register: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post('/auth/register', data);
    return handleResponse<{ token: string; user: User }>(res);
  },
  me: async () => {
    const res = await api.get('/auth/me');
    return handleResponse<User>(res);
  },
};

// Courses
export const courseService = {
  getAll: async () => {
    const res = await api.get('/courses');
    return handleResponse<Course[]>(res);
  },
  getById: async (id: number) => {
    const res = await api.get(`/courses/${id}`);
    return handleResponse<Course>(res);
  },
  create: async (data: Omit<Course, 'id'>) => {
    const res = await api.post('/courses', data);
    return handleResponse<Course>(res);
  },
  update: async (id: number, data: Partial<Course>) => {
    const res = await api.put(`/courses/${id}`, data);
    return handleResponse<Course>(res);
  },
  delete: async (id: number) => {
    const res = await api.delete(`/courses/${id}`);
    return handleResponse<void>(res);
  },
};

// Categories
export const categoryService = {
  getAll: async () => {
    const res = await api.get('/categories');
    return handleResponse<Category[]>(res);
  },
  create: async (data: Omit<Category, 'id'>) => {
    const res = await api.post('/categories', data);
    return handleResponse<Category>(res);
  },
  update: async (id: number, data: Partial<Category>) => {
    const res = await api.put(`/categories/${id}`, data);
    return handleResponse<Category>(res);
  },
  delete: async (id: number) => {
    const res = await api.delete(`/categories/${id}`);
    return handleResponse<void>(res);
  },
};

// Enrollments
export const enrollmentService = {
  getAll: async () => {
    const res = await api.get('/enrollments');
    return handleResponse<Enrollment[]>(res);
  },
  getByUser: async (userId: number) => {
    const res = await api.get(`/enrollments/user/${userId}`);
    return handleResponse<Enrollment[]>(res);
  },
  enroll: async (courseId: number) => {
    const res = await api.post('/enrollments', { courseId });
    return handleResponse<Enrollment>(res);
  },
};

// Users
export const userService = {
  getAll: async () => {
    const res = await api.get('/users');
    return handleResponse<User[]>(res);
  },
};
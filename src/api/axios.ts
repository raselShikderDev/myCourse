import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://register.cseconference.org/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      // Dispatch handled in setupInterceptors with store reference
      window.dispatchEvent(new CustomEvent('auth:logout'));
      window.location.href = '/login';
    } else if (status === 403) {
      toast.error('Access Denied');
    } else if (status === 500) {
      toast.error('Something went wrong');
    }
    return Promise.reject(error);
  }
);

export default api;
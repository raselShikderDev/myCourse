import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAppSelector(s => s.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAppSelector(s => s.auth.token);
  if (token) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
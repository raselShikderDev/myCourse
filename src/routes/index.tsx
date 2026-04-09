import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';
import { DashboardLayout } from '../layouts/DashboardLayout';

const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CoursesPage = lazy(() => import('../pages/dashboard/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CategoriesPage = lazy(() => import('../pages/dashboard/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const EnrollmentsPage = lazy(() => import('../pages/dashboard/EnrollmentsPage').then(m => ({ default: m.EnrollmentsPage })));
const UsersPage = lazy(() => import('../pages/dashboard/UsersPage').then(m => ({ default: m.UsersPage })));

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/login"
        element={<GuestRoute><LoginPage /></GuestRoute>}
      />
      <Route
        path="/register"
        element={<GuestRoute><RegisterPage /></GuestRoute>}
      />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
      >
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="enrollments" element={<EnrollmentsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
);
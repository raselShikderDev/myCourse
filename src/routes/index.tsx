import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';

// Auth guards (inline — no Redux dependency here)
const ProtectedRoute = lazy(() => import('./ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));
const GuestRoute = lazy(() => import('./ProtectedRoute').then(m => ({ default: m.GuestRoute })));

// Auth pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));

// Dashboard
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const CoursesPage = lazy(() => import('../pages/dashboard/CoursesPage').then(m => ({ default: m.CoursesPage })));
const CategoriesPage = lazy(() => import('../pages/dashboard/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const EnrollmentsPage = lazy(() => import('../pages/dashboard/EnrollmentsPage').then(m => ({ default: m.EnrollmentsPage })));
const UsersPage = lazy(() => import('../pages/dashboard/UsersPage').then(m => ({ default: m.UsersPage })));

// Public pages
const Home = lazy(() => import('../pages/public/Home').then(m => ({ default: m.Home })));
const Courses = lazy(() => import('../pages/public/Courses').then(m => ({ default: m.Courses })));
const CourseDetail = lazy(() => import('../pages/public/CourseDetail').then(m => ({ default: m.CourseDetail })));
const About = lazy(() => import('../pages/public/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('../pages/public/Contact').then(m => ({ default: m.Contact })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const AppRoutes: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Public routes with Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth routes (guest only) */}
      <Route path="/login" element={
        <Suspense fallback={<PageLoader />}>
          <GuestRoute><LoginPage /></GuestRoute>
        </Suspense>
      } />
      <Route path="/register" element={
        <Suspense fallback={<PageLoader />}>
          <GuestRoute><RegisterPage /></GuestRoute>
        </Suspense>
      } />

      {/* Protected dashboard */}
      <Route path="/dashboard" element={
        <Suspense fallback={<PageLoader />}>
          <ProtectedRoute><DashboardLayout /></ProtectedRoute>
        </Suspense>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="enrollments" element={<EnrollmentsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);



// import React, { Suspense, lazy } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { ProtectedRoute, GuestRoute } from './ProtectedRoute';
// import { DashboardLayout } from '../layouts/DashboardLayout';

// const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
// const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
// const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
// const CoursesPage = lazy(() => import('../pages/dashboard/CoursesPage').then(m => ({ default: m.CoursesPage })));
// const CategoriesPage = lazy(() => import('../pages/dashboard/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
// const EnrollmentsPage = lazy(() => import('../pages/dashboard/EnrollmentsPage').then(m => ({ default: m.EnrollmentsPage })));
// const UsersPage = lazy(() => import('../pages/dashboard/UsersPage').then(m => ({ default: m.UsersPage })));

// const PageLoader = () => (
//   <div className="flex items-center justify-center h-64">
//     <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
//   </div>
// );

// export const AppRoutes: React.FC = () => (
//   <Suspense fallback={<PageLoader />}>
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route
//         path="/login"
//         element={<GuestRoute><LoginPage /></GuestRoute>}
//       />
//       <Route
//         path="/register"
//         element={<GuestRoute><RegisterPage /></GuestRoute>}
//       />
//       <Route
//         path="/dashboard"
//         element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
//       >
//         <Route index element={<DashboardPage />} />
//         <Route path="courses" element={<CoursesPage />} />
//         <Route path="categories" element={<CategoriesPage />} />
//         <Route path="enrollments" element={<EnrollmentsPage />} />
//         <Route path="users" element={<UsersPage />} />
//       </Route>
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   </Suspense>
// );
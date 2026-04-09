import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/auth/authSlice';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '⬛', exact: true },
  { to: '/dashboard/courses', label: 'Courses', icon: '📚' },
  { to: '/dashboard/categories', label: 'Categories', icon: '🏷️' },
  { to: '/dashboard/enrollments', label: 'Enrollments', icon: '🎓' },
  { to: '/dashboard/users', label: 'Users', icon: '👥' },
];

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(s => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const NavLinks = ({ onClose }: { onClose?: () => void }) => (
    <nav className="flex flex-col gap-0.5 p-3">
      {navItems.map(({ to, label, icon, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-surface-100 hover:text-slate-900'
            }`
          }
        >
          <span className="text-base">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-surface-200 fixed top-0 left-0 h-full z-30">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-surface-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <span className="font-semibold text-slate-900 text-sm">CourseMS</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>

        {/* User section */}
        <div className="p-3 border-t border-surface-200">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
              <span className="text-brand-700 text-xs font-semibold">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-surface-200 h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="font-semibold text-slate-900 text-sm">CourseMS</span>
        </div>
      </header>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl lg:hidden animate-slide-up">
            <div className="px-5 py-4 border-b border-surface-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <span className="font-semibold text-slate-900 text-sm">CourseMS</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface-100 text-slate-400"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavLinks onClose={() => setSidebarOpen(false)} />
            </div>
            <div className="p-3 border-t border-surface-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all"
              >
                <span>🚪</span> Sign Out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
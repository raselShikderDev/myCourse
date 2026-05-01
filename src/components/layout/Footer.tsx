import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Product: [
    { label: 'Courses', to: '/courses' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Account: [
    { label: 'Sign In', to: '/login' },
    { label: 'Register', to: '/register' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
};

const socials = [
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'GitHub', icon: '⌥', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
];

export const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">CourseMS</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            A modern course management platform built for educators and learners. Create, manage, and grow your courses with ease.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {socials.map(s => (
              <a key={s.label} href={s.href}
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-semibold text-slate-300 hover:bg-brand-600 hover:text-white transition-all duration-200">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link Groups */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{group}</h4>
            <ul className="space-y-2.5">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} CourseMS. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
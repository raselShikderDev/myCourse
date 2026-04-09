import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCourses } from '../../features/courses/coursesSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { fetchEnrollments } from '../../features/enrollments/enrollmentsSlice';
import { Skeleton } from '../../components/ui/Skeleton';
import { Link } from 'react-router-dom';

const StatCard = ({
  label, value, icon, color, to,
}: { label: string; value: number; icon: string; color: string; to: string }) => (
  <Link
    to={to}
    className="bg-white rounded-xl border border-surface-200 shadow-card p-5 flex items-center gap-4 hover:shadow-md transition-shadow group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </Link>
);

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(s => s.courses);
  const categories = useAppSelector(s => s.categories);
  const enrollments = useAppSelector(s => s.enrollments);
  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const loading = courses.loading || categories.loading || enrollments.loading;

  const stats = [
    { label: 'Total Courses', value: courses.items.length, icon: '📚', color: 'bg-brand-50', to: '/dashboard/courses' },
    { label: 'Categories', value: categories.items.length, icon: '🏷️', color: 'bg-emerald-50', to: '/dashboard/categories' },
    { label: 'Enrollments', value: enrollments.items.length, icon: '🎓', color: 'bg-amber-50', to: '/dashboard/enrollments' },
  ];

  const recentCourses = [...courses.items].slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Good day{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">Here's what's happening with your courses.</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>
      )}

      {/* Recent Courses */}
      <div className="bg-white rounded-xl border border-surface-200 shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <h2 className="font-semibold text-slate-900 text-sm">Recent Courses</h2>
          <Link to="/dashboard/courses" className="text-xs text-brand-600 hover:underline font-medium">View all →</Link>
        </div>
        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : recentCourses.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-10">No courses yet.</p>
        ) : (
          <ul className="divide-y divide-surface-100">
            {recentCourses.map(course => {
              const category = categories.items.find(c => c.id === course.categoryId);
              return (
                <li key={course.id} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-50 transition-colors">
                  <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-brand-600 text-sm">📖</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{course.title}</p>
                    <p className="text-xs text-slate-400">{category?.name ?? 'Uncategorized'}</p>
                  </div>
                  {course.price !== undefined && (
                    <span className="text-xs font-semibold text-emerald-600 shrink-0">
                      ${course.price}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
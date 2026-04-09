import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchEnrollments, enrollInCourse } from '../../features/enrollments/enrollmentsSlice';
import { fetchCourses } from '../../features/courses/coursesSlice';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { Badge } from '../../components/ui/Badge';

const statusLabel = (status?: number) => {
  switch (status) {
    case 1: return { label: 'Active', variant: 'success' as const };
    case 2: return { label: 'Completed', variant: 'info' as const };
    case 0: return { label: 'Pending', variant: 'warning' as const };
    default: return { label: 'Unknown', variant: 'default' as const };
  }
};

export const EnrollmentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(s => s.enrollments);
  const courses = useAppSelector(s => s.courses.items);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    dispatch(fetchEnrollments());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEnroll = async () => {
    if (!selectedCourseId) return;
    setEnrolling(true);
    await dispatch(enrollInCourse(Number(selectedCourseId)));
    setEnrolling(false);
    setEnrollModalOpen(false);
    setSelectedCourseId('');
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Enrollments</h1>
          <p className="text-sm text-slate-500">{items.length} total enrollments</p>
        </div>
        <Button onClick={() => setEnrollModalOpen(true)}>+ Enroll in Course</Button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card"><TableSkeleton /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <EmptyState
            icon="🎓"
            title="No enrollments yet"
            description="Enroll in a course to get started."
            action={<Button onClick={() => setEnrollModalOpen(true)} size="sm">+ Enroll Now</Button>}
          />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Course</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">User ID</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Payment Date</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {items.map(enrollment => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  const { label, variant } = statusLabel(enrollment.status);
                  return (
                    <tr key={enrollment.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900">
                        {course?.title ?? `Course #${enrollment.courseId}`}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">#{enrollment.userId}</td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {enrollment.paymentDate
                          ? new Date(enrollment.paymentDate).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-3">
            {items.map(enrollment => {
              const course = courses.find(c => c.id === enrollment.courseId);
              const { label, variant } = statusLabel(enrollment.status);
              return (
                <div key={enrollment.id} className="bg-white rounded-xl border border-surface-200 shadow-card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-slate-900 text-sm">
                      {course?.title ?? `Course #${enrollment.courseId}`}
                    </p>
                    <Badge variant={variant}>{label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>User #{enrollment.userId}</span>
                    {enrollment.paymentDate && (
                      <span>{new Date(enrollment.paymentDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Enroll Modal */}
      <Modal open={enrollModalOpen} onClose={() => setEnrollModalOpen(false)} title="Enroll in Course" size="sm">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Select Course</label>
            <select
              value={selectedCourseId}
              onChange={e => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="">Choose a course...</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setEnrollModalOpen(false)} className="flex-1">Cancel</Button>
            <Button
              loading={enrolling}
              disabled={!selectedCourseId}
              onClick={handleEnroll}
              className="flex-1"
            >
              Enroll
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
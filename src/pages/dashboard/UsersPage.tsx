import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUser } from '../../features/auth/authSlice';
import api from '../../api/axios';
import { handleResponse } from '../../utils/response';
import { getErrorMessage } from '../../utils/response';
import toast from 'react-hot-toast';
import { User } from '../../types';

/* ─── Zod schema ─────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Max 80 characters'),
  email: z.string().email().optional(),
});
type FormData = z.infer<typeof schema>;

/* ─── Role label helper ──────────────────────────────────── */
const roleLabel = (roleId: number) => {
  switch (roleId) {
    case 1: return { label: 'Admin', color: 'bg-red-50 text-red-700 border-red-100' };
    case 2: return { label: 'Instructor', color: 'bg-brand-50 text-brand-700 border-brand-100' };
    default: return { label: 'Student', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
  }
};

/* ─── Avatar initials ────────────────────────────────────── */
const getInitials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

/* ─── Stat Card ──────────────────────────────────────────── */
const StatCard: React.FC<{ icon: string; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl border border-surface-200 shadow-card p-4 flex items-center gap-3">
    <div className="w-10 h-10 bg-surface-50 rounded-lg flex items-center justify-center text-xl shrink-0">{icon}</div>
    <div>
      <p className="text-lg font-bold text-slate-900 leading-none">{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
    </div>
  </div>
);

/* ─── Field Row (read mode) ──────────────────────────────── */
const FieldRow: React.FC<{ label: string; value: string; icon?: string }> = ({ label, value, icon }) => (
  <div className="flex items-start gap-4 py-3.5 border-b border-surface-100 last:border-0">
    {icon && <span className="text-base mt-0.5 shrink-0">{icon}</span>}
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-900 truncate">{value}</p>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(s => s.auth.user);
  const enrollments = useAppSelector(s => s.enrollments.items);
  const courses = useAppSelector(s => s.courses.items);

  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '' },
  });

  /* Sync form when user changes */
  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  const openEdit = () => {
    setAnimating(true);
    setTimeout(() => {
      setEditMode(true);
      setAnimating(false);
    }, 120);
  };

  const cancelEdit = () => {
    setAnimating(true);
    setTimeout(() => {
      setEditMode(false);
      setAnimating(false);
      reset({ name: user?.name ?? '', email: user?.email ?? '' });
    }, 120);
  };

  const onSubmit = async (data: FormData) => {
    if (!isDirty) { cancelEdit(); return; }
    setSubmitting(true);
    try {
      const res = await api.patch('/api/v1/user/edit', { name: data.name });
      const updated = handleResponse<User>(res);
      dispatch(setUser({ ...user!, name: updated?.name ?? data.name }));
      toast.success('Profile updated!');
      setAnimating(true);
      setTimeout(() => { setEditMode(false); setAnimating(false); }, 120);
    } catch (err) {
      toast.error(getErrorMessage(err) || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { label: roleName, color: roleColor } = roleLabel(user.roleId);
  const userEnrollments = enrollments.filter(e => e.userId === user.id);
  const userCourses = courses.length;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Profile</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage your account information</p>
        </div>
        {!editMode && (
          <button
            onClick={openEdit}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        )}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: Avatar Card ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-card p-6 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white text-2xl font-bold">{getInitials(user.name)}</span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${user.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </div>

            <h2 className="text-base font-bold text-slate-900 mb-1">{user.name}</h2>
            <p className="text-sm text-slate-400 mb-3 truncate">{user.email}</p>

            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${roleColor}`}>
              {roleName}
            </span>

            <div className="mt-5 pt-5 border-t border-surface-100">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                <span className="text-xs text-slate-500">{user.isActive ? 'Active account' : 'Inactive account'}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <StatCard icon="🎓" label="Enrollments" value={userEnrollments.length} />
            <StatCard icon="📚" label="Courses" value={userCourses} />
          </div>
        </div>

        {/* ── Right: Info / Edit Form ── */}
        <div className="lg:col-span-2">
          <div
            className={`bg-white rounded-2xl border border-surface-200 shadow-card overflow-hidden transition-opacity duration-150 ${animating ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {editMode ? 'Edit Profile' : 'Account Information'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {editMode ? 'Update your personal information below.' : 'Your personal details and account settings.'}
                </p>
              </div>
              {editMode && (
                <button
                  onClick={cancelEdit}
                  disabled={submitting}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-surface-100 transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* ── VIEW MODE ── */}
            {!editMode && (
              <div className="px-6 py-2">
                <FieldRow icon="👤" label="Full Name" value={user.name} />
                <FieldRow icon="📧" label="Email Address" value={user.email} />
                <FieldRow icon="🔑" label="Role" value={roleName} />
                <FieldRow icon="🆔" label="User ID" value={`#${user.id}`} />
                <FieldRow
                  icon="✅"
                  label="Account Status"
                  value={user.isActive ? 'Active' : 'Inactive'}
                />
              </div>
            )}

            {/* ── EDIT MODE ── */}
            {editMode && (
              <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('name')}
                    placeholder="Your full name"
                    autoFocus
                    className={`
                      w-full px-3 py-2.5 text-sm text-slate-900 bg-white
                      border rounded-xl outline-none transition-all
                      placeholder:text-slate-400
                      focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
                      ${errors.name ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-surface-300'}
                    `}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span>⚠</span> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email (read-only) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    Email Address
                    <span className="text-xs font-normal bg-surface-100 text-slate-400 px-2 py-0.5 rounded-full">
                      cannot be changed
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="email"
                      disabled
                      className="w-full px-3 py-2.5 text-sm text-slate-400 bg-surface-100 border border-surface-200 rounded-xl cursor-not-allowed select-none pr-10"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-400">Contact support to change your email address.</p>
                </div>

                {/* Role (display only) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Role</label>
                  <div className="px-3 py-2.5 text-sm bg-surface-100 border border-surface-200 rounded-xl text-slate-500 cursor-not-allowed">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleColor}`}>
                      {roleName}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-surface-100 pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={submitting || !isDirty}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {isDirty ? 'Save Changes' : 'No Changes'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={submitting}
                    className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium bg-surface-100 hover:bg-surface-200 disabled:opacity-50 text-slate-700 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {!isDirty && (
                  <p className="text-xs text-slate-400 text-center -mt-1">
                    Make a change above to enable saving.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* ── Security note ── */}
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0 mt-0.5">🔒</span>
            <div>
              <p className="text-sm font-medium text-amber-800">Password & Email changes</p>
              <p className="text-xs text-amber-600 mt-0.5">
                To change your email address or password, please contact support or use the account settings panel if available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { fetchUsers } from '../../features/users/usersSlice';
// import { EmptyState } from '../../components/ui/EmptyState';
// import { TableSkeleton } from '../../components/ui/Skeleton';
// import { Badge } from '../../components/ui/Badge';

// const roleLabel = (roleId: number) => {
//   switch (roleId) {
//     case 1: return 'Admin';
//     case 2: return 'Instructor';
//     default: return 'Student';
//   }
// };

// export const UsersPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { items, loading } = useAppSelector(s => s.users);

//   useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

//   return (
//     <div className="space-y-5 animate-fade-in">
//       <div>
//         <h1 className="text-xl font-bold text-slate-900">Users</h1>
//         <p className="text-sm text-slate-500">{items.length} registered users</p>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-xl border border-surface-200 shadow-card"><TableSkeleton /></div>
//       ) : items.length === 0 ? (
//         <div className="bg-white rounded-xl border border-surface-200 shadow-card">
//           <EmptyState icon="👥" title="No users found" description="No registered users yet." />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden md:block bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="bg-surface-50 border-b border-surface-200">
//                   <th className="text-left px-5 py-3 font-medium text-slate-500">User</th>
//                   <th className="text-left px-5 py-3 font-medium text-slate-500">Email</th>
//                   <th className="text-left px-5 py-3 font-medium text-slate-500">Role</th>
//                   <th className="text-left px-5 py-3 font-medium text-slate-500">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-surface-100">
//                 {items.map(user => (
//                   <tr key={user.id} className="hover:bg-surface-50 transition-colors">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
//                           <span className="text-brand-700 text-xs font-semibold">
//                             {user.name?.[0]?.toUpperCase() ?? 'U'}
//                           </span>
//                         </div>
//                         <span className="font-medium text-slate-900">{user.name}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-slate-500">{user.email}</td>
//                     <td className="px-5 py-3.5">
//                       <Badge variant={user.roleId === 1 ? 'danger' : user.roleId === 2 ? 'info' : 'default'}>
//                         {roleLabel(user.roleId)}
//                       </Badge>
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <Badge variant={user.isActive ? 'success' : 'warning'}>
//                         {user.isActive ? 'Active' : 'Inactive'}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden grid gap-3">
//             {items.map(user => (
//               <div key={user.id} className="bg-white rounded-xl border border-surface-200 shadow-card p-4">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
//                     <span className="text-brand-700 text-sm font-semibold">
//                       {user.name?.[0]?.toUpperCase() ?? 'U'}
//                     </span>
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-semibold text-slate-900 truncate">{user.name}</p>
//                     <p className="text-xs text-slate-400 truncate">{user.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant={user.roleId === 1 ? 'danger' : user.roleId === 2 ? 'info' : 'default'}>
//                     {roleLabel(user.roleId)}
//                   </Badge>
//                   <Badge variant={user.isActive ? 'success' : 'warning'}>
//                     {user.isActive ? 'Active' : 'Inactive'}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUsers } from '../../features/users/usersSlice';
import { EmptyState } from '../../components/ui/EmptyState';
import { TableSkeleton } from '../../components/ui/Skeleton';
import { Badge } from '../../components/ui/Badge';

const roleLabel = (roleId: number) => {
  switch (roleId) {
    case 1: return 'Admin';
    case 2: return 'Instructor';
    default: return 'Student';
  }
};

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(s => s.users);

  useEffect(() => { dispatch(fetchUsers()); }, [dispatch]);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Users</h1>
        <p className="text-sm text-slate-500">{items.length} registered users</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card"><TableSkeleton /></div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-surface-200 shadow-card">
          <EmptyState icon="👥" title="No users found" description="No registered users yet." />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-surface-200 shadow-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-5 py-3 font-medium text-slate-500">User</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Email</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Role</th>
                  <th className="text-left px-5 py-3 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {items.map(user => (
                  <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                          <span className="text-brand-700 text-xs font-semibold">
                            {user.name?.[0]?.toUpperCase() ?? 'U'}
                          </span>
                        </div>
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={user.roleId === 1 ? 'danger' : user.roleId === 2 ? 'info' : 'default'}>
                        {roleLabel(user.roleId)}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={user.isActive ? 'success' : 'warning'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid gap-3">
            {items.map(user => (
              <div key={user.id} className="bg-white rounded-xl border border-surface-200 shadow-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <span className="text-brand-700 text-sm font-semibold">
                      {user.name?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.roleId === 1 ? 'danger' : user.roleId === 2 ? 'info' : 'default'}>
                    {roleLabel(user.roleId)}
                  </Badge>
                  <Badge variant={user.isActive ? 'success' : 'warning'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
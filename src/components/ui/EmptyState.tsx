import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon = '📭', title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-base font-semibold text-slate-700 mb-1">{title}</h3>
    {description && <p className="text-sm text-slate-400 max-w-xs mb-4">{description}</p>}
    {action}
  </div>
);
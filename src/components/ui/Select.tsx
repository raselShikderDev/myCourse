import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          {...props}
          className={`
            w-full px-3 py-2 text-sm text-slate-900 bg-white
            border rounded-lg outline-none transition-all cursor-pointer
            focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
            disabled:bg-surface-100 disabled:cursor-not-allowed
            ${error ? 'border-red-400' : 'border-surface-300'}
            ${className}
          `}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
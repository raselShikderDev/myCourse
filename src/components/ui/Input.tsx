import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          {...props}
          className={`
            w-full px-3 py-2 text-sm text-slate-900 bg-white
            border rounded-lg outline-none transition-all
            placeholder:text-slate-400
            focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
            disabled:bg-surface-100 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-surface-300'}
            ${className}
          `}
        />
        {error && <p className="text-xs text-red-500 flex items-center gap-1"><span>⚠</span>{error}</p>}
        {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
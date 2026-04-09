import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={3}
          {...props}
          className={`
            w-full px-3 py-2 text-sm text-slate-900 bg-white
            border rounded-lg outline-none transition-all resize-none
            placeholder:text-slate-400
            focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
            ${error ? 'border-red-400' : 'border-surface-300'}
            ${className}
          `}
        />
        {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
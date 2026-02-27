import React from 'react';

// Textarea Component - Yet another inconsistent API
interface FormTextareaProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
}) => {
  const textareaClasses = ['form-textarea', error && 'error'].filter(Boolean).join(' ');
  const helperClasses = ['form-helper-text', error && 'error'].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
      />

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className="form-helper-text">{helpText}</span>}
    </div>
  );
};
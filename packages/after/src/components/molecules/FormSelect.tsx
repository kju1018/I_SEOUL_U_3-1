import React from 'react';

// Select Component - Inconsistent with Input component
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'md',
}) => {
  void size; // Keep for API consistency but not used in rendering
  const selectClasses = ['form-select', error && 'error'].filter(Boolean).join(' ');
  const helperClasses = ['form-helper-text', error && 'error'].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={selectClasses}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className="form-helper-text">{helpText}</span>}
    </div>
  );
};
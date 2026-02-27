import React from 'react';

// Checkbox Component - Completely different approach again
interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}) => {
  const wrapperClasses = ['checkbox-wrapper', disabled && 'disabled'].filter(Boolean).join(' ');
  const customClasses = ['checkbox-custom', checked && 'checked', disabled && 'disabled'].filter(Boolean).join(' ');
  const checkmarkClasses = ['checkbox-checkmark', checked && 'visible'].filter(Boolean).join(' ');
  const labelClasses = ['checkbox-label', error && 'error', disabled && 'disabled'].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div>
      <div className={wrapperClasses} onClick={handleClick}>
        <div className="checkbox-container">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => {}} // Handled by onClick
            disabled={disabled}
            className="checkbox-input"
          />
          <div className={customClasses}>
            <span className={checkmarkClasses}>✓</span>
          </div>
        </div>
        <label className={labelClasses}>{label}</label>
      </div>

      {error && <span className="checkbox-error">{error}</span>}
      {hint && !error && <span className="checkbox-hint">{hint}</span>}
    </div>
  );
};
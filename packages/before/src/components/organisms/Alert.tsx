import React from 'react';

// Alert - Different styling approach with inconsistent variants
interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info': return 'ℹ️';
      case 'success': return '✓';
      case 'warning': return '⚠️';
      case 'error': return '✕';
      default: return '•';
    }
  };

  const alertClasses = ['alert', `alert-${variant}`].join(' ');

  return (
    <div className={alertClasses}>
      {showIcon && <div className="alert-icon">{getIcon()}</div>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-body">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="alert-close">
          ×
        </button>
      )}
    </div>
  );
};

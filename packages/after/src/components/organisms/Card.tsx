import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  headerActions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  headerActions,
}) => {
  const cardClasses = ['card', `card-${variant}`].join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle || headerActions) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

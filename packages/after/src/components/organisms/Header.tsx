import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#007bff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '20px',
          }}>
            L
          </div>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1a202c',
              margin: 0,
              lineHeight: 1,
            }}>
              Hanghae Company
            </h1>
            <p style={{
              fontSize: '11px',
              color: '#718096',
              margin: 0,
              lineHeight: 1,
              marginTop: '2px',
            }}>
              Design System Migration Project
            </p>
          </div>
        </div>


        {/* User Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            textAlign: 'right',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1a202c',
            }}>
              Demo User
            </div>
            <div style={{
              fontSize: '12px',
              color: '#718096',
            }}>
              demo@example.com
            </div>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#007bff',
            fontWeight: '600',
            fontSize: '16px',
          }}>
            DU
          </div>
        </div>
      </div>
    </header>
  );
};

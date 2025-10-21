import React from 'react';

/**
 * Componente Button reutilizable - Estilo "El Búho Digital"
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = ''
}) => {
  const baseStyles = {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? '#94A3B8' : '#34D399', // Verde Esmeralda
      color: '#0F172A', // Negro para máximo contraste
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#E2E8F0', // Blanco Hueso
      border: '2px solid #334155', // Gris Oscuro
    },
    danger: {
      backgroundColor: disabled ? '#94A3B8' : '#EF4444', // Rojo Intenso
      color: '#E2E8F0', // Blanco Hueso
      border: 'none',
    },
    success: {
      backgroundColor: disabled ? '#94A3B8' : '#22C55E', // Verde Éxito
      color: '#0F172A',
      border: 'none',
    },
    warning: {
      backgroundColor: disabled ? '#94A3B8' : '#F59E0B', // Ámbar
      color: '#0F172A',
      border: 'none',
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={buttonStyle}
      onMouseOver={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.target.style.backgroundColor = '#6EE7B7'; // Verde más brillante
          } else if (variant === 'secondary') {
            e.target.style.backgroundColor = '#1E293B'; // Gris Pizarra
          } else if (variant === 'danger') {
            e.target.style.backgroundColor = '#DC2626'; // Rojo más oscuro
          } else if (variant === 'success') {
            e.target.style.backgroundColor = '#16A34A';
          } else if (variant === 'warning') {
            e.target.style.backgroundColor = '#D97706';
          }
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = variants[variant].backgroundColor;
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;

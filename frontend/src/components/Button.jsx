import React from 'react';

/**
 * Componente Button reutilizable
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
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: '#fff',
    },
    secondary: {
      backgroundColor: disabled ? '#ccc' : '#6c757d',
      color: '#fff',
    },
    success: {
      backgroundColor: disabled ? '#ccc' : '#28a745',
      color: '#fff',
    },
    danger: {
      backgroundColor: disabled ? '#ccc' : '#dc3545',
      color: '#fff',
    },
    warning: {
      backgroundColor: disabled ? '#ccc' : '#ffc107',
      color: '#000',
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
          e.target.style.opacity = '0.8';
        }
      }}
      onMouseOut={(e) => {
        e.target.style.opacity = '1';
      }}
    >
      {children}
    </button>
  );
};

export default Button;

import React, { useState } from 'react';

/**
 * Componente Input reutilizable - Estilo "El Búho Digital"
 */
const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    marginBottom: '20px',
    width: '100%',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'var(--font-body)',
    color: '#94A3B8', // Gris Claro
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    fontFamily: 'var(--font-body)',
    border: error 
      ? '2px solid #EF4444' // Rojo Intenso para errores
      : isFocused 
        ? '2px solid #34D399' // Verde Esmeralda en focus
        : '1px solid #334155', // Gris Oscuro normal
    borderRadius: '8px',
    boxSizing: 'border-box',
    backgroundColor: disabled ? '#1E293B' : '#0F172A', // Fondo Pizarra
    color: '#E2E8F0', // Blanco Hueso
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  const errorStyle = {
    color: '#EF4444', // Rojo Intenso
    fontSize: '12px',
    marginTop: '5px',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        style={inputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
};

export default Input;

import React from 'react';

/**
 * Componente Input reutilizable
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
  const containerStyle = {
    marginBottom: '20px',
    width: '100%',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: error ? '2px solid #dc3545' : '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label htmlFor={name} style={labelStyle}>
          {label} {required && <span style={{ color: '#dc3545' }}>*</span>}
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
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
};

export default Input;

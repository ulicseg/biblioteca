import React from 'react';

/**
 * Componente BookCard para mostrar información de un libro
 */
const BookCard = ({ libro, onSelect, showSelect = false }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  };

  const infoStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '4px',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    marginTop: '8px',
    marginRight: '8px',
  };

  const hayDisponibles = libro.copias_disponibles > 0;

  return (
    <div 
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={titleStyle}>{libro.titulo}</div>
      <div style={infoStyle}>
        <strong>Autor:</strong> {libro.autor}
      </div>
      <div style={infoStyle}>
        <strong>ISBN:</strong> {libro.isbn}
      </div>
      <div style={infoStyle}>
        <strong>Copias:</strong> {libro.copias_disponibles} disponible{libro.copias_disponibles !== 1 ? 's' : ''} de {libro.total_copias} total{libro.total_copias !== 1 ? 'es' : ''}
      </div>
      
      <span 
        style={{
          ...badgeStyle,
          backgroundColor: hayDisponibles ? '#d4edda' : '#f8d7da',
          color: hayDisponibles ? '#155724' : '#721c24',
        }}
      >
        {hayDisponibles ? '✓ Disponible' : '✗ No disponible'}
      </span>
      
      {showSelect && onSelect && (
        <div style={{ marginTop: '12px' }}>
          <button
            onClick={() => onSelect(libro)}
            disabled={!hayDisponibles}
            style={{
              padding: '8px 16px',
              backgroundColor: !hayDisponibles ? '#ccc' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: !hayDisponibles ? 'not-allowed' : 'pointer',
              fontSize: '14px',
            }}
          >
            Seleccionar
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;

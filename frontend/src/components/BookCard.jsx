import React from 'react';

/**
 * Componente BookCard para mostrar información de un libro - Estilo "El Búho Digital"
 */
const BookCard = ({ libro, onSelect, showSelect = false }) => {
  const cardStyle = {
    border: '1px solid #334155', // Gris Oscuro - borde sutil
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    backgroundColor: '#1E293B', // Fondo Secundario (Gris Pizarra)
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.2s ease',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    color: '#E2E8F0', // Blanco Hueso
    marginBottom: '12px',
  };

  const infoStyle = {
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    color: '#94A3B8', // Gris Claro
    marginBottom: '6px',
  };

  const strongStyle = {
    color: '#E2E8F0', // Blanco Hueso para labels
    fontWeight: '600',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    marginTop: '12px',
    marginRight: '8px',
  };

  const hayDisponibles = libro.copias_disponibles > 0;

  return (
    <div 
      style={cardStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(52, 211, 153, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
      }}
    >
      <div style={titleStyle}>{libro.titulo}</div>
      <div style={infoStyle}>
        <span style={strongStyle}>Autor:</span> {libro.autor}
      </div>
      <div style={infoStyle}>
        <span style={strongStyle}>ISBN:</span> {libro.isbn}
      </div>
      <div style={infoStyle}>
        <span style={strongStyle}>Copias:</span> {libro.copias_disponibles} disponible{libro.copias_disponibles !== 1 ? 's' : ''} de {libro.total_copias} total{libro.total_copias !== 1 ? 'es' : ''}
      </div>
      
      {/* Pill de estado con colores de la paleta */}
      <span 
        style={{
          ...badgeStyle,
          backgroundColor: hayDisponibles ? '#34D399' : '#EF4444', // Verde Esmeralda o Rojo Intenso
          color: '#0F172A', // Negro para contraste
        }}
      >
        {hayDisponibles ? '✓ Disponible' : '✗ No disponible'}
      </span>
      
      {showSelect && onSelect && (
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={() => onSelect(libro)}
            disabled={!hayDisponibles}
            style={{
              padding: '10px 20px',
              backgroundColor: !hayDisponibles ? '#94A3B8' : '#34D399', // Verde Esmeralda
              color: '#0F172A',
              border: 'none',
              borderRadius: '8px',
              cursor: !hayDisponibles ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              if (hayDisponibles) {
                e.target.style.backgroundColor = '#6EE7B7'; // Verde más brillante
              }
            }}
            onMouseOut={(e) => {
              if (hayDisponibles) {
                e.target.style.backgroundColor = '#34D399';
              }
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

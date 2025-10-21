import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { sociosAPI } from '../api/bibliotecaApi';

/**
 * Página para gestionar socios (Alta de socio)
 */
const GestionSocios = () => {
  const [formData, setFormData] = useState({
    dni: '',
    nro_socio: '',
    nombre_completo: '',
  });

  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await sociosAPI.crear(formData);
      
      setMensaje({
        tipo: 'success',
        texto: response.mensaje || 'Socio creado exitosamente'
      });

      // Limpiar formulario
      setFormData({
        dni: '',
        nro_socio: '',
        nombre_completo: '',
      });
    } catch (error) {
      setMensaje({
        tipo: 'error',
        texto: error.message || 'Error al crear el socio'
      });
    } finally {
      setCargando(false);
    }
  };

  const pageStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    color: '#E2E8F0', // Blanco Hueso
    marginBottom: '24px',
    textAlign: 'center',
  };

  const cardStyle = {
    backgroundColor: '#1E293B', // Fondo Secundario
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    border: '1px solid #334155', // Borde sutil
  };

  const mensajeStyle = {
    padding: '14px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    backgroundColor: mensaje.tipo === 'success' ? '#22C55E' : '#EF4444',
    color: '#0F172A', // Negro para contraste
    border: `1px solid ${mensaje.tipo === 'success' ? '#16A34A' : '#DC2626'}`,
    textAlign: 'center',
    fontWeight: '600',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Alta de Socio</h1>
      
      <div style={cardStyle}>
        {mensaje.texto && (
          <div style={mensajeStyle}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="DNI"
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="Ej: 12345678"
            required
          />

          <Input
            label="Número de Socio"
            type="text"
            name="nro_socio"
            value={formData.nro_socio}
            onChange={handleChange}
            placeholder="Ej: SOC001"
            required
          />

          <Input
            label="Nombre Completo"
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={cargando}
            className="btn-submit"
          >
            {cargando ? 'Creando...' : 'Crear Socio'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GestionSocios;

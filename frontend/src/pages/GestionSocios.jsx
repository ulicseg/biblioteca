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
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const mensajeStyle = {
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: mensaje.tipo === 'success' ? '#d4edda' : '#f8d7da',
    color: mensaje.tipo === 'success' ? '#155724' : '#721c24',
    border: `1px solid ${mensaje.tipo === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
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

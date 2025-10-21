import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

/**
 * Página de inicio de sesión
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
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

    const result = await login(formData.usuario, formData.password);

    if (result.success) {
      // Redirigir a la página principal
      navigate('/');
    } else {
      setMensaje({
        tipo: 'error',
        texto: result.error || 'Error al iniciar sesión'
      });
    }

    setCargando(false);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0F172A', // Fondo Principal
    padding: '20px',
  };

  const loginBoxStyle = {
    backgroundColor: '#1E293B', // Fondo Secundario
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    border: '1px solid #334155', // Borde sutil
    width: '100%',
    maxWidth: '440px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    color: '#E2E8F0', // Blanco Hueso
    marginBottom: '8px',
    textAlign: 'center',
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontFamily: 'var(--font-body)',
    color: '#94A3B8', // Gris Claro
    marginBottom: '32px',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '56px',
    textAlign: 'center',
    marginBottom: '20px',
    filter: 'grayscale(0.3)',
  };

  const mensajeStyle = {
    padding: '14px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    backgroundColor: '#EF4444', // Rojo Intenso
    color: '#E2E8F0', // Blanco Hueso
    border: '1px solid #DC2626',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <div style={iconStyle}>📚</div>
        <h1 style={titleStyle}>Sistema de Biblioteca</h1>
        <p style={subtitleStyle}>Iniciar Sesión</p>

        {mensaje.texto && (
          <div style={mensajeStyle}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Usuario"
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            placeholder="Ingrese su usuario"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={cargando}
            style={{ width: '100%' }}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

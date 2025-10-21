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
    backgroundColor: '#f5f5f5',
  };

  const loginBoxStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'center',
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#666',
    marginBottom: '32px',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '16px',
  };

  const mensajeStyle = {
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
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

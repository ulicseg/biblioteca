import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import ProtectedRoute from './src/components/ProtectedRoute';
import Login from './src/pages/Login';
import GestionSocios from './src/pages/GestionSocios';
import RealizarPrestamo from './src/pages/RealizarPrestamo';
import RegistrarDevolucion from './src/pages/RegistrarDevolucion';
import Button from './src/components/Button';

/**
 * Componente del contenido principal de la aplicación
 */
function AppContent() {
  const { bibliotecario, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '20px 0',
    marginBottom: '30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    textAlign: 'center',
    width: '100%',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    flex: 1,
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '10px 20px',
    borderRadius: '5px',
  };

  const mainStyle = {
    minHeight: 'calc(100vh - 200px)',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '50px',
    color: '#666',
    fontSize: '14px',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {bibliotecario && (
        <header style={headerStyle}>
          <div style={containerStyle}>
            <h1 style={titleStyle}>📚 Sistema de Gestión de Biblioteca</h1>
            <div style={headerContentStyle}>
              <nav style={navStyle}>
                <Link 
                  to="/alta-socio" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                  Alta de Socio
                </Link>
                <Link 
                  to="/realizar-prestamo" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                  Realizar Préstamo
                </Link>
                <Link 
                  to="/registrar-devolucion" 
                  style={linkStyle}
                  onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                >
                  Registrar Devolución
                </Link>
              </nav>
              <div style={userInfoStyle}>
                <span>👤 {bibliotecario.nombre_completo}</span>
                <Button 
                  onClick={handleLogout}
                  variant="danger"
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '14px',
                    backgroundColor: 'rgba(220, 53, 69, 0.9)'
                  }}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main style={mainStyle}>
        <div style={containerStyle}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                  <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '16px' }}>
                    Bienvenido, {bibliotecario?.nombre_completo || 'Bibliotecario'}
                  </h2>
                  <p style={{ fontSize: '16px', color: '#666' }}>
                    Seleccione una opción del menú superior para comenzar
                  </p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/alta-socio" element={
              <ProtectedRoute>
                <GestionSocios />
              </ProtectedRoute>
            } />
            
            <Route path="/realizar-prestamo" element={
              <ProtectedRoute>
                <RealizarPrestamo />
              </ProtectedRoute>
            } />
            
            <Route path="/registrar-devolucion" element={
              <ProtectedRoute>
                <RegistrarDevolucion />
              </ProtectedRoute>
            } />

            {/* Ruta por defecto: redirigir al home o login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {bibliotecario && (
        <footer style={footerStyle}>
          <p>Sistema de Gestión de Biblioteca - Proyecto Universitario © 2025</p>
        </footer>
      )}
    </div>
  );
}

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

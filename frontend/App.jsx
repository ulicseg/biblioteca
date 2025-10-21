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
    backgroundColor: '#1E293B', // Fondo Secundario
    color: '#E2E8F0',
    padding: '20px 0',
    marginBottom: '0',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    borderBottom: '2px solid #334155',
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
    fontWeight: '700',
    fontFamily: 'var(--font-heading)',
    margin: '0 0 15px 0',
    textAlign: 'center',
    width: '100%',
    color: '#E2E8F0',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    flex: 1,
  };

  const linkStyle = {
    color: '#E2E8F0',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '2px solid #334155',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s ease',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#0F172A',
    padding: '12px 20px',
    borderRadius: '8px',
    border: '1px solid #334155',
    color: '#E2E8F0',
    fontFamily: 'var(--font-body)',
  };

  const mainStyle = {
    minHeight: 'calc(100vh - 200px)',
    backgroundColor: '#0F172A', // Fondo Principal
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '50px',
    color: '#94A3B8', // Gris Claro
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    backgroundColor: '#0F172A',
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', backgroundColor: '#0F172A', minHeight: '100vh' }}>
      {bibliotecario && (
        <header style={headerStyle}>
          <div style={containerStyle}>
            <h1 style={titleStyle}>🦉 Sistema de Gestión de Biblioteca</h1>
            <div style={headerContentStyle}>
              <nav style={navStyle}>
                <Link 
                  to="/alta-socio" 
                  style={linkStyle}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#334155';
                    e.target.style.borderColor = '#34D399';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#334155';
                  }}
                >
                  Alta de Socio
                </Link>
                <Link 
                  to="/realizar-prestamo" 
                  style={linkStyle}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#334155';
                    e.target.style.borderColor = '#34D399';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#334155';
                  }}
                >
                  Realizar Préstamo
                </Link>
                <Link 
                  to="/registrar-devolucion" 
                  style={linkStyle}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#334155';
                    e.target.style.borderColor = '#34D399';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#334155';
                  }}
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
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px',
                  backgroundColor: '#0F172A',
                  minHeight: 'calc(100vh - 200px)',
                }}>
                  <div style={{
                    fontSize: '64px',
                    marginBottom: '24px',
                  }}>🦉</div>
                  <h2 style={{ 
                    fontSize: '28px', 
                    color: '#E2E8F0',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    marginBottom: '16px',
                  }}>
                    Bienvenido, {bibliotecario?.nombre_completo || 'Bibliotecario'}
                  </h2>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#94A3B8',
                    fontFamily: 'var(--font-body)',
                  }}>
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

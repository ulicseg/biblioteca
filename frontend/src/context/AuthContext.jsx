import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/bibliotecaApi';

/**
 * Contexto de autenticación
 */
const AuthContext = createContext(null);

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

/**
 * Proveedor de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [bibliotecario, setBibliotecario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const bibliotecarioGuardado = localStorage.getItem('bibliotecario');
    if (bibliotecarioGuardado) {
      setBibliotecario(JSON.parse(bibliotecarioGuardado));
    }
    setCargando(false);
  }, []);

  // Iniciar sesión
  const login = async (usuario, password) => {
    try {
      const response = await authAPI.login(usuario, password);
      const bibliotecarioData = response.data;
      
      // Guardar en estado y localStorage
      setBibliotecario(bibliotecarioData);
      localStorage.setItem('bibliotecario', JSON.stringify(bibliotecarioData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await authAPI.logout();
      setBibliotecario(null);
      localStorage.removeItem('bibliotecario');
      return { success: true };
    } catch (error) {
      // Cerrar sesión localmente incluso si falla la petición
      setBibliotecario(null);
      localStorage.removeItem('bibliotecario');
      return { success: true };
    }
  };

  const value = {
    bibliotecario,
    estaAutenticado: !!bibliotecario,
    login,
    logout,
    cargando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

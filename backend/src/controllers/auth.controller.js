import * as authService from '../services/auth.service.js';

/**
 * Controlador para iniciar sesión
 */
export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const bibliotecario = await authService.verificarCredenciales(usuario, password);

    res.status(200).json({
      success: true,
      data: bibliotecario,
      mensaje: 'Inicio de sesión exitoso'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para cerrar sesión
 */
export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      mensaje: 'Sesión cerrada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

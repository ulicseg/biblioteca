import * as prestamosService from '../services/prestamos.service.js';

/**
 * Controlador para registrar un nuevo préstamo
 */
export const registrarPrestamo = async (req, res) => {
  try {
    const { socio_id, libro_id, fecha_devolucion_limite } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!socio_id || !libro_id || !fecha_devolucion_limite) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: socio_id, libro_id y fecha_devolucion_limite'
      });
    }

    const prestamo = await prestamosService.registrarPrestamo(
      socio_id, 
      libro_id, 
      fecha_devolucion_limite
    );

    res.status(201).json({
      success: true,
      data: prestamo,
      mensaje: 'Préstamo registrado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para registrar la devolución de un libro
 */
export const registrarDevolucion = async (req, res) => {
  try {
    const { libro_id, libro_danado } = req.body;

    const resultado = await prestamosService.registrarDevolucion(
      libro_id,
      libro_danado || false
    );

    res.status(200).json({
      success: true,
      data: resultado.prestamo,
      multa: resultado.multa || null,
      mensaje: resultado.mensaje
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener todos los préstamos
 */
export const obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await prestamosService.obtenerTodosPrestamos();

    res.status(200).json({
      success: true,
      data: prestamos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener préstamos activos
 */
export const obtenerPrestamosActivos = async (req, res) => {
  try {
    const prestamos = await prestamosService.obtenerPrestamosActivos();

    res.status(200).json({
      success: true,
      data: prestamos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para buscar un préstamo activo por libro
 */
export const buscarPrestamoActivoPorLibro = async (req, res) => {
  try {
    const { libroId } = req.params;

    const prestamo = await prestamosService.buscarPrestamoActivoPorLibro(parseInt(libroId));

    if (!prestamo) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró un préstamo activo para este libro'
      });
    }

    res.status(200).json({
      success: true,
      data: prestamo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener préstamos activos de un socio
 */
export const obtenerPrestamosActivosPorSocio = async (req, res) => {
  try {
    const { identificador } = req.params;

    const prestamos = await prestamosService.obtenerPrestamosActivosPorSocio(identificador);

    res.status(200).json({
      success: true,
      data: prestamos
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

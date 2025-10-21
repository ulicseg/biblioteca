import express from 'express';
import * as prestamosController from '../controllers/prestamos.controller.js';

const router = express.Router();

/**
 * POST /api/prestamos
 * Registrar un nuevo préstamo
 */
router.post('/', prestamosController.registrarPrestamo);

/**
 * POST /api/prestamos/devolucion
 * Registrar la devolución de un libro
 */
router.post('/devolucion', prestamosController.registrarDevolucion);

/**
 * GET /api/prestamos
 * Obtener todos los préstamos
 */
router.get('/', prestamosController.obtenerPrestamos);

/**
 * GET /api/prestamos/activos
 * Obtener préstamos activos
 */
router.get('/activos', prestamosController.obtenerPrestamosActivos);

/**
 * GET /api/prestamos/libro/:libroId
 * Buscar préstamo activo por ID de libro
 */
router.get('/libro/:libroId', prestamosController.buscarPrestamoActivoPorLibro);

/**
 * GET /api/prestamos/socio/:identificador
 * Buscar préstamos activos por socio (DNI o nro_socio)
 */
router.get('/socio/:identificador', prestamosController.obtenerPrestamosActivosPorSocio);

export default router;

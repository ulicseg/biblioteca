import express from 'express';
import * as sociosController from '../controllers/socios.controller.js';

const router = express.Router();

/**
 * POST /api/socios
 * Crear un nuevo socio
 */
router.post('/', sociosController.crearSocio);

/**
 * GET /api/socios
 * Obtener todos los socios
 */
router.get('/', sociosController.obtenerSocios);

/**
 * GET /api/socios/:identificador
 * Buscar un socio por DNI o número de socio
 */
router.get('/:identificador', sociosController.buscarSocio);

export default router;

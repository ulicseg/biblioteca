import express from 'express';
import * as librosController from '../controllers/libros.controller.js';

const router = express.Router();

/**
 * GET /api/libros
 * Obtener todos los libros
 */
router.get('/', librosController.obtenerLibros);

/**
 * GET /api/libros/buscar?termino=xxx
 * Buscar libros por título o autor
 */
router.get('/buscar', librosController.buscarLibros);

/**
 * GET /api/libros/isbn/:isbn
 * Buscar un libro por ISBN
 */
router.get('/isbn/:isbn', librosController.buscarLibroPorIsbn);

/**
 * GET /api/libros/:id
 * Buscar un libro por ID
 */
router.get('/:id', librosController.buscarLibroPorId);

export default router;

import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Iniciar sesión
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/logout
 * Cerrar sesión
 */
router.post('/logout', authController.logout);

export default router;

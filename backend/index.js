import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './src/routes/auth.routes.js';
import sociosRoutes from './src/routes/socios.routes.js';
import librosRoutes from './src/routes/libros.routes.js';
import prestamosRoutes from './src/routes/prestamos.routes.js';

// Importar middlewares
import { errorHandler, notFound } from './src/middlewares/errorHandler.js';
import { securityHeaders } from './src/middlewares/securityHeaders.js';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(helmet()); // Seguridad HTTP headers
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parser de JSON
app.use(express.urlencoded({ extended: true })); // Parser de URL-encoded
app.use(securityHeaders); // Headers de seguridad adicionales

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    success: true,
    mensaje: 'API Sistema de Gestión de Biblioteca',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      socios: '/api/socios',
      libros: '/api/libros',
      prestamos: '/api/prestamos'
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/socios', sociosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Sistema de Gestión de Biblioteca - Backend`);
  console.log(`🔗 Endpoints disponibles en http://localhost:${PORT}/api`);
});

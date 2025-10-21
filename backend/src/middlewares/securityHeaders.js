/**
 * Middleware para configurar headers de seguridad adicionales
 */
export const securityHeaders = (req, res, next) => {
  // Configurar headers de seguridad adicionales
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
};

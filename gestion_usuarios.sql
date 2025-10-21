-- =====================================================
-- GESTIÓN DE USUARIOS BIBLIOTECARIOS
-- =====================================================

-- 1. CREAR UN NUEVO BIBLIOTECARIO
-- Reemplaza los valores según sea necesario
INSERT INTO bibliotecario (usuario, password, nombre_completo) 
VALUES ('nuevo_usuario', 'nueva_contraseña', 'Nombre Completo');

-- Ejemplo:
-- INSERT INTO bibliotecario (usuario, password, nombre_completo) 
-- VALUES ('juan.perez', 'password123', 'Juan Pérez');


-- 2. CAMBIAR LA CONTRASEÑA DE UN BIBLIOTECARIO
-- Reemplaza 'usuario_aqui' y 'nueva_contraseña'
UPDATE bibliotecario 
SET password = 'nueva_contraseña' 
WHERE usuario = 'usuario_aqui';

-- Ejemplo para cambiar la contraseña del admin:
-- UPDATE bibliotecario 
-- SET password = 'MiNuevaContraseñaSegura123' 
-- WHERE usuario = 'admin';


-- 3. VER TODOS LOS BIBLIOTECARIOS
SELECT id_bibliotecario, usuario, nombre_completo 
FROM bibliotecario;


-- 4. ELIMINAR UN BIBLIOTECARIO
-- ⚠️ CUIDADO: Esta acción no se puede deshacer
DELETE FROM bibliotecario 
WHERE usuario = 'usuario_a_eliminar';


-- 5. VERIFICAR SI UN USUARIO EXISTE
SELECT * FROM bibliotecario 
WHERE usuario = 'nombre_usuario';


-- =====================================================
-- NOTA IMPORTANTE: SEGURIDAD
-- =====================================================
-- Este sistema almacena contraseñas en texto plano para
-- simplificar el proyecto universitario.
-- 
-- En un entorno de producción real, deberías:
-- 1. Usar hashing para las contraseñas (bcrypt, argon2, etc.)
-- 2. Implementar tokens JWT para autenticación
-- 3. Usar HTTPS para todas las comunicaciones
-- 4. Implementar rate limiting para prevenir ataques de fuerza bruta
-- =====================================================

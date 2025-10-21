-- =====================================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS
-- Sistema de Gestión de Biblioteca
-- =====================================================

-- Crear tabla bibliotecario
CREATE TABLE IF NOT EXISTS bibliotecario (
  id_bibliotecario BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nombre_completo TEXT NOT NULL
);

-- Crear tabla socio
CREATE TABLE IF NOT EXISTS socio (
  id_socio BIGSERIAL PRIMARY KEY,
  dni TEXT NOT NULL,
  nro_socio TEXT NOT NULL,
  nombre_completo TEXT NOT NULL
);

-- Crear tabla libro
CREATE TABLE IF NOT EXISTS libro (
  id_libro BIGSERIAL PRIMARY KEY,
  isbn TEXT NOT NULL,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ejemplar_numero INTEGER NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('disponible', 'prestado')),
  UNIQUE(isbn, ejemplar_numero)
);

-- Crear tabla prestamo
CREATE TABLE IF NOT EXISTS prestamo (
  id_prestamo BIGSERIAL PRIMARY KEY,
  socio_id BIGINT NOT NULL REFERENCES socio(id_socio),
  libro_id BIGINT NOT NULL REFERENCES libro(id_libro),
  fecha_inicio DATE NOT NULL,
  fecha_devolucion_limite DATE NOT NULL,
  fecha_devolucion DATE
);

-- Crear tabla multa
CREATE TABLE IF NOT EXISTS multa (
  id_multa BIGSERIAL PRIMARY KEY,
  prestamo_id BIGINT NOT NULL REFERENCES prestamo(id_prestamo),
  fecha DATE NOT NULL,
  monto NUMERIC NOT NULL,
  motivo TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'pagada'))
);

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar bibliotecario por defecto
-- IMPORTANTE: Cambia la contraseña después del primer login
INSERT INTO bibliotecario (usuario, password, nombre_completo) 
VALUES ('admin', 'admin123', 'Administrador del Sistema')
ON CONFLICT (usuario) DO NOTHING;

-- Insertar libros de ejemplo (opcional - se recomienda usar insertar_libros.sql en su lugar)
-- NOTA: Si vas a usar insertar_libros.sql, comenta o elimina esta sección para evitar duplicados
INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  ('978-84-376-0494-7', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 'disponible'),
  ('978-03-075-4729-3', 'Cien años de soledad', 'Gabriel García Márquez', 1, 'disponible'),
  ('978-84-9759-201-4', '1984', 'George Orwell', 1, 'disponible'),
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 1, 'disponible'),
  ('978-84-204-0114-5', 'Rayuela', 'Julio Cortázar', 1, 'disponible')
ON CONFLICT (isbn, ejemplar_numero) DO NOTHING;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

-- Verificar que las tablas se crearon correctamente
SELECT 'Tablas creadas exitosamente' AS mensaje;

-- Mostrar cantidad de registros en cada tabla
SELECT 'bibliotecario' AS tabla, COUNT(*) AS registros FROM bibliotecario
UNION ALL
SELECT 'socio', COUNT(*) FROM socio
UNION ALL
SELECT 'libro', COUNT(*) FROM libro
UNION ALL
SELECT 'prestamo', COUNT(*) FROM prestamo
UNION ALL
SELECT 'multa', COUNT(*) FROM multa;

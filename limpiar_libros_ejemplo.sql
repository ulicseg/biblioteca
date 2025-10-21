-- =====================================================
-- SCRIPT DE LIMPIEZA: ELIMINAR LIBROS DUPLICADOS
-- =====================================================
-- Este script elimina los libros del database_setup.sql original
-- para evitar duplicados con insertar_libros.sql

-- EJECUTAR ANTES de insertar_libros.sql si ya ejecutaste database_setup.sql

-- Eliminar los 5 libros de ejemplo del database_setup.sql
DELETE FROM libro WHERE isbn IN (
  '978-0-123456-78-9',  -- Don Quijote (ISBN de ejemplo)
  '978-0-987654-32-1',  -- Cien años de soledad (ISBN de ejemplo)
  '978-0-111111-11-1',  -- 1984 (ISBN de ejemplo)
  '978-0-222222-22-2',  -- El principito (ISBN de ejemplo)
  '978-0-333333-33-3'   -- Rayuela (ISBN de ejemplo)
);

-- Verificar que se eliminaron
SELECT 'Libros de ejemplo eliminados' AS mensaje, COUNT(*) AS restantes FROM libro;

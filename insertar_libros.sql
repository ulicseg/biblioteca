-- =====================================================
-- SCRIPT PARA INSERTAR MÚLTIPLES LIBROS
-- Sistema de Gestión de Biblioteca
-- =====================================================
-- Este script inserta una variedad de libros con múltiples copias
-- Ejecutar en Supabase SQL Editor después de crear las tablas

-- =====================================================
-- LITERATURA CLÁSICA ESPAÑOLA Y LATINOAMERICANA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- Don Quijote de la Mancha (3 copias)
  ('978-84-376-0494-7', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1, 'disponible'),
  ('978-84-376-0494-7', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 2, 'disponible'),
  ('978-84-376-0494-7', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 3, 'disponible'),
  
  -- Cien años de soledad (4 copias - muy popular)
  ('978-03-075-4729-3', 'Cien años de soledad', 'Gabriel García Márquez', 1, 'disponible'),
  ('978-03-075-4729-3', 'Cien años de soledad', 'Gabriel García Márquez', 2, 'disponible'),
  ('978-03-075-4729-3', 'Cien años de soledad', 'Gabriel García Márquez', 3, 'disponible'),
  ('978-03-075-4729-3', 'Cien años de soledad', 'Gabriel García Márquez', 4, 'disponible'),
  
  -- Rayuela (2 copias)
  ('978-84-204-0114-5', 'Rayuela', 'Julio Cortázar', 1, 'disponible'),
  ('978-84-204-0114-5', 'Rayuela', 'Julio Cortázar', 2, 'disponible'),
  
  -- La casa de los espíritus (2 copias)
  ('978-84-204-0116-9', 'La casa de los espíritus', 'Isabel Allende', 1, 'disponible'),
  ('978-84-204-0116-9', 'La casa de los espíritus', 'Isabel Allende', 2, 'disponible'),
  
  -- El amor en los tiempos del cólera (3 copias)
  ('978-84-397-0025-5', 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 1, 'disponible'),
  ('978-84-397-0025-5', 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 2, 'disponible'),
  ('978-84-397-0025-5', 'El amor en los tiempos del cólera', 'Gabriel García Márquez', 3, 'disponible'),
  
  -- Pedro Páramo (2 copias)
  ('978-84-204-0264-7', 'Pedro Páramo', 'Juan Rulfo', 1, 'disponible'),
  ('978-84-204-0264-7', 'Pedro Páramo', 'Juan Rulfo', 2, 'disponible'),
  
  -- Ficciones (2 copias)
  ('978-84-204-0085-8', 'Ficciones', 'Jorge Luis Borges', 1, 'disponible'),
  ('978-84-204-0085-8', 'Ficciones', 'Jorge Luis Borges', 2, 'disponible'),
  
  -- La ciudad y los perros (2 copias)
  ('978-84-204-0089-6', 'La ciudad y los perros', 'Mario Vargas Llosa', 1, 'disponible'),
  ('978-84-204-0089-6', 'La ciudad y los perros', 'Mario Vargas Llosa', 2, 'disponible');

-- =====================================================
-- LITERATURA UNIVERSAL CLÁSICA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- 1984 (3 copias)
  ('978-84-9759-201-4', '1984', 'George Orwell', 1, 'disponible'),
  ('978-84-9759-201-4', '1984', 'George Orwell', 2, 'disponible'),
  ('978-84-9759-201-4', '1984', 'George Orwell', 3, 'disponible'),
  
  -- Orgullo y prejuicio (2 copias)
  ('978-84-9759-202-1', 'Orgullo y prejuicio', 'Jane Austen', 1, 'disponible'),
  ('978-84-9759-202-1', 'Orgullo y prejuicio', 'Jane Austen', 2, 'disponible'),
  
  -- Crimen y castigo (2 copias)
  ('978-84-9759-203-8', 'Crimen y castigo', 'Fiódor Dostoyevski', 1, 'disponible'),
  ('978-84-9759-203-8', 'Crimen y castigo', 'Fiódor Dostoyevski', 2, 'disponible'),
  
  -- El gran Gatsby (2 copias)
  ('978-84-9759-204-5', 'El gran Gatsby', 'F. Scott Fitzgerald', 1, 'disponible'),
  ('978-84-9759-204-5', 'El gran Gatsby', 'F. Scott Fitzgerald', 2, 'disponible'),
  
  -- Matar un ruiseñor (2 copias)
  ('978-84-9759-205-2', 'Matar un ruiseñor', 'Harper Lee', 1, 'disponible'),
  ('978-84-9759-205-2', 'Matar un ruiseñor', 'Harper Lee', 2, 'disponible'),
  
  -- El viejo y el mar (2 copias)
  ('978-84-9759-206-9', 'El viejo y el mar', 'Ernest Hemingway', 1, 'disponible'),
  ('978-84-9759-206-9', 'El viejo y el mar', 'Ernest Hemingway', 2, 'disponible'),
  
  -- Cumbres borrascosas (1 copia)
  ('978-84-9759-207-6', 'Cumbres borrascosas', 'Emily Brontë', 1, 'disponible'),
  
  -- Ulises (1 copia)
  ('978-84-9759-208-3', 'Ulises', 'James Joyce', 1, 'disponible');

-- =====================================================
-- LITERATURA INFANTIL Y JUVENIL
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- El principito (5 copias - muy popular)
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 1, 'disponible'),
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 2, 'disponible'),
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 3, 'disponible'),
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 4, 'disponible'),
  ('978-84-7888-174-4', 'El principito', 'Antoine de Saint-Exupéry', 5, 'disponible'),
  
  -- Harry Potter y la piedra filosofal (4 copias)
  ('978-84-7888-175-1', 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 1, 'disponible'),
  ('978-84-7888-175-1', 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 2, 'disponible'),
  ('978-84-7888-175-1', 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 3, 'disponible'),
  ('978-84-7888-175-1', 'Harry Potter y la piedra filosofal', 'J.K. Rowling', 4, 'disponible'),
  
  -- El señor de los anillos: La comunidad del anillo (3 copias)
  ('978-84-7888-176-8', 'El señor de los anillos: La comunidad del anillo', 'J.R.R. Tolkien', 1, 'disponible'),
  ('978-84-7888-176-8', 'El señor de los anillos: La comunidad del anillo', 'J.R.R. Tolkien', 2, 'disponible'),
  ('978-84-7888-176-8', 'El señor de los anillos: La comunidad del anillo', 'J.R.R. Tolkien', 3, 'disponible'),
  
  -- Las crónicas de Narnia (2 copias)
  ('978-84-7888-177-5', 'Las crónicas de Narnia', 'C.S. Lewis', 1, 'disponible'),
  ('978-84-7888-177-5', 'Las crónicas de Narnia', 'C.S. Lewis', 2, 'disponible'),
  
  -- Alicia en el país de las maravillas (3 copias)
  ('978-84-7888-178-2', 'Alicia en el país de las maravillas', 'Lewis Carroll', 1, 'disponible'),
  ('978-84-7888-178-2', 'Alicia en el país de las maravillas', 'Lewis Carroll', 2, 'disponible'),
  ('978-84-7888-178-2', 'Alicia en el país de las maravillas', 'Lewis Carroll', 3, 'disponible');

-- =====================================================
-- CIENCIA FICCIÓN Y FANTASÍA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- Fahrenheit 451 (2 copias)
  ('978-84-9759-301-1', 'Fahrenheit 451', 'Ray Bradbury', 1, 'disponible'),
  ('978-84-9759-301-1', 'Fahrenheit 451', 'Ray Bradbury', 2, 'disponible'),
  
  -- Un mundo feliz (2 copias)
  ('978-84-9759-302-8', 'Un mundo feliz', 'Aldous Huxley', 1, 'disponible'),
  ('978-84-9759-302-8', 'Un mundo feliz', 'Aldous Huxley', 2, 'disponible'),
  
  -- Dune (2 copias)
  ('978-84-9759-303-5', 'Dune', 'Frank Herbert', 1, 'disponible'),
  ('978-84-9759-303-5', 'Dune', 'Frank Herbert', 2, 'disponible'),
  
  -- Fundación (2 copias)
  ('978-84-9759-304-2', 'Fundación', 'Isaac Asimov', 1, 'disponible'),
  ('978-84-9759-304-2', 'Fundación', 'Isaac Asimov', 2, 'disponible'),
  
  -- La guerra de los mundos (1 copia)
  ('978-84-9759-305-9', 'La guerra de los mundos', 'H.G. Wells', 1, 'disponible'),
  
  -- Neuromante (1 copia)
  ('978-84-9759-306-6', 'Neuromante', 'William Gibson', 1, 'disponible');

-- =====================================================
-- MISTERIO Y THRILLER
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- El código Da Vinci (3 copias)
  ('978-84-9759-401-8', 'El código Da Vinci', 'Dan Brown', 1, 'disponible'),
  ('978-84-9759-401-8', 'El código Da Vinci', 'Dan Brown', 2, 'disponible'),
  ('978-84-9759-401-8', 'El código Da Vinci', 'Dan Brown', 3, 'disponible'),
  
  -- El nombre de la rosa (2 copias)
  ('978-84-9759-402-5', 'El nombre de la rosa', 'Umberto Eco', 1, 'disponible'),
  ('978-84-9759-402-5', 'El nombre de la rosa', 'Umberto Eco', 2, 'disponible'),
  
  -- Los crímenes de la calle Morgue (2 copias)
  ('978-84-9759-403-2', 'Los crímenes de la calle Morgue', 'Edgar Allan Poe', 1, 'disponible'),
  ('978-84-9759-403-2', 'Los crímenes de la calle Morgue', 'Edgar Allan Poe', 2, 'disponible'),
  
  -- El sabueso de los Baskerville (2 copias)
  ('978-84-9759-404-9', 'El sabueso de los Baskerville', 'Arthur Conan Doyle', 1, 'disponible'),
  ('978-84-9759-404-9', 'El sabueso de los Baskerville', 'Arthur Conan Doyle', 2, 'disponible'),
  
  -- La chica del tren (2 copias)
  ('978-84-9759-405-6', 'La chica del tren', 'Paula Hawkins', 1, 'disponible'),
  ('978-84-9759-405-6', 'La chica del tren', 'Paula Hawkins', 2, 'disponible');

-- =====================================================
-- NOVELA HISTÓRICA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- Los pilares de la Tierra (3 copias)
  ('978-84-9759-501-5', 'Los pilares de la Tierra', 'Ken Follett', 1, 'disponible'),
  ('978-84-9759-501-5', 'Los pilares de la Tierra', 'Ken Follett', 2, 'disponible'),
  ('978-84-9759-501-5', 'Los pilares de la Tierra', 'Ken Follett', 3, 'disponible'),
  
  -- La sombra del viento (3 copias)
  ('978-84-9759-502-2', 'La sombra del viento', 'Carlos Ruiz Zafón', 1, 'disponible'),
  ('978-84-9759-502-2', 'La sombra del viento', 'Carlos Ruiz Zafón', 2, 'disponible'),
  ('978-84-9759-502-2', 'La sombra del viento', 'Carlos Ruiz Zafón', 3, 'disponible'),
  
  -- El médico (2 copias)
  ('978-84-9759-503-9', 'El médico', 'Noah Gordon', 1, 'disponible'),
  ('978-84-9759-503-9', 'El médico', 'Noah Gordon', 2, 'disponible'),
  
  -- La catedral del mar (2 copias)
  ('978-84-9759-504-6', 'La catedral del mar', 'Ildefonso Falcones', 1, 'disponible'),
  ('978-84-9759-504-6', 'La catedral del mar', 'Ildefonso Falcones', 2, 'disponible');

-- =====================================================
-- POESÍA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- Veinte poemas de amor y una canción desesperada (3 copias)
  ('978-84-9759-601-2', 'Veinte poemas de amor y una canción desesperada', 'Pablo Neruda', 1, 'disponible'),
  ('978-84-9759-601-2', 'Veinte poemas de amor y una canción desesperada', 'Pablo Neruda', 2, 'disponible'),
  ('978-84-9759-601-2', 'Veinte poemas de amor y una canción desesperada', 'Pablo Neruda', 3, 'disponible'),
  
  -- Romancero gitano (2 copias)
  ('978-84-9759-602-9', 'Romancero gitano', 'Federico García Lorca', 1, 'disponible'),
  ('978-84-9759-602-9', 'Romancero gitano', 'Federico García Lorca', 2, 'disponible'),
  
  -- Canto general (1 copia)
  ('978-84-9759-603-6', 'Canto general', 'Pablo Neruda', 1, 'disponible'),
  
  -- Antología poética (1 copia)
  ('978-84-9759-604-3', 'Antología poética', 'Octavio Paz', 1, 'disponible');

-- =====================================================
-- NO FICCIÓN Y ENSAYO
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- Sapiens: De animales a dioses (3 copias)
  ('978-84-9759-701-9', 'Sapiens: De animales a dioses', 'Yuval Noah Harari', 1, 'disponible'),
  ('978-84-9759-701-9', 'Sapiens: De animales a dioses', 'Yuval Noah Harari', 2, 'disponible'),
  ('978-84-9759-701-9', 'Sapiens: De animales a dioses', 'Yuval Noah Harari', 3, 'disponible'),
  
  -- Una breve historia del tiempo (2 copias)
  ('978-84-9759-702-6', 'Una breve historia del tiempo', 'Stephen Hawking', 1, 'disponible'),
  ('978-84-9759-702-6', 'Una breve historia del tiempo', 'Stephen Hawking', 2, 'disponible'),
  
  -- El origen de las especies (2 copias)
  ('978-84-9759-703-3', 'El origen de las especies', 'Charles Darwin', 1, 'disponible'),
  ('978-84-9759-703-3', 'El origen de las especies', 'Charles Darwin', 2, 'disponible'),
  
  -- Las venas abiertas de América Latina (2 copias)
  ('978-84-9759-704-0', 'Las venas abiertas de América Latina', 'Eduardo Galeano', 1, 'disponible'),
  ('978-84-9759-704-0', 'Las venas abiertas de América Latina', 'Eduardo Galeano', 2, 'disponible'),
  
  -- El arte de la guerra (2 copias)
  ('978-84-9759-705-7', 'El arte de la guerra', 'Sun Tzu', 1, 'disponible'),
  ('978-84-9759-705-7', 'El arte de la guerra', 'Sun Tzu', 2, 'disponible');

-- =====================================================
-- DESARROLLO PERSONAL Y AUTOAYUDA
-- =====================================================

INSERT INTO libro (isbn, titulo, autor, ejemplar_numero, estado) VALUES
  -- El poder del ahora (2 copias)
  ('978-84-9759-801-6', 'El poder del ahora', 'Eckhart Tolle', 1, 'disponible'),
  ('978-84-9759-801-6', 'El poder del ahora', 'Eckhart Tolle', 2, 'disponible'),
  
  -- Los 7 hábitos de la gente altamente efectiva (2 copias)
  ('978-84-9759-802-3', 'Los 7 hábitos de la gente altamente efectiva', 'Stephen Covey', 1, 'disponible'),
  ('978-84-9759-802-3', 'Los 7 hábitos de la gente altamente efectiva', 'Stephen Covey', 2, 'disponible'),
  
  -- Inteligencia emocional (2 copias)
  ('978-84-9759-803-0', 'Inteligencia emocional', 'Daniel Goleman', 1, 'disponible'),
  ('978-84-9759-803-0', 'Inteligencia emocional', 'Daniel Goleman', 2, 'disponible');

-- =====================================================
-- RESUMEN Y VERIFICACIÓN
-- =====================================================

-- Contar total de libros insertados
SELECT 'Total de ejemplares insertados' AS descripcion, COUNT(*) AS cantidad FROM libro;

-- Contar libros únicos (por ISBN)
SELECT 'Títulos únicos' AS descripcion, COUNT(DISTINCT isbn) AS cantidad FROM libro;

-- Mostrar distribución por cantidad de copias
SELECT 
  'Libros con ' || copias_por_isbn || ' copia(s)' AS descripcion,
  COUNT(*) AS cantidad_titulos
FROM (
  SELECT isbn, COUNT(*) AS copias_por_isbn
  FROM libro
  GROUP BY isbn
) AS subquery
GROUP BY copias_por_isbn
ORDER BY copias_por_isbn;

-- Mostrar algunos ejemplos de libros con múltiples copias
SELECT 
  titulo,
  autor,
  COUNT(*) AS total_copias,
  SUM(CASE WHEN estado = 'disponible' THEN 1 ELSE 0 END) AS disponibles
FROM libro
GROUP BY titulo, autor
HAVING COUNT(*) > 1
ORDER BY total_copias DESC
LIMIT 10;

SELECT '¡Libros insertados exitosamente!' AS mensaje;

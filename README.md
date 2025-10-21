# Sistema de Gestión de Biblioteca

Sistema completo de gestión de biblioteca desarrollado con arquitectura en capas para un proyecto universitario.

## 📋 Stack Tecnológico

### Backend
- **Node.js** v18+
- **Express** v4.18.2
- **Supabase** (@supabase/supabase-js v2.39.0)
- **CORS**, **Helmet**, **Dotenv**

### Frontend
- **React** v18.2.0
- **Vite** v5.0.8
- **React Router DOM** v6.20.0

### Base de Datos
- **Supabase** (PostgreSQL)

## 🗂️ Estructura del Proyecto

```
Biblioteca/
├── backend/
│   ├── src/
│   │   ├── routes/           # Rutas de la API
│   │   ├── controllers/      # Controladores
│   │   ├── services/         # Lógica de negocio
│   │   ├── database/         # Cliente Supabase
│   │   └── middlewares/      # Middlewares
│   ├── index.js             # Servidor Express
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes reutilizables
    │   ├── pages/           # Páginas principales
    │   ├── api/             # Cliente API
    │   └── assets/          # Recursos estáticos
    ├── App.jsx
    ├── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## 🗄️ Esquema de Base de Datos (Supabase)

### Tabla: `socio`
- `id_socio` (int8, PK)
- `dni` (text)
- `nro_socio` (text)
- `nombre_completo` (text)

### Tabla: `bibliotecario`
- `id_bibliotecario` (int8, PK)
- `usuario` (text)
- `password` (text)
- `nombre_completo` (text)

### Tabla: `libro`
- `id_libro` (int8, PK)
- `isbn` (text)
- `titulo` (text)
- `autor` (text)
- `ejemplar_numero` (int) - **Número de ejemplar/copia**
- `estado` (text) - 'disponible' | 'prestado'
- UNIQUE constraint en (isbn, ejemplar_numero)

### Tabla: `prestamo`
- `id_prestamo` (int8, PK)
- `socio_id` (int8, FK → socio.id_socio)
- `libro_id` (int8, FK → libro.id_libro)
- `fecha_inicio` (date)
- `fecha_devolucion_limite` (date) - **Fecha límite de devolución (obligatoria)**
- `fecha_devolucion` (date, nullable)

### Tabla: `multa`
- `id_multa` (int8, PK)
- `prestamo_id` (int8, FK → prestamo.id_prestamo)
- `fecha` (date)
- `monto` (numeric)
- `motivo` (text)
- `estado` (text) - 'pendiente' | 'pagada'

## 🚀 Instalación y Configuración

### 1. Configurar la Base de Datos en Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. En el SQL Editor, ejecuta las siguientes consultas para crear las tablas:

```sql
-- Crear tabla bibliotecario
CREATE TABLE bibliotecario (
  id_bibliotecario BIGSERIAL PRIMARY KEY,
  usuario TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nombre_completo TEXT NOT NULL
);

-- Crear tabla socio
CREATE TABLE socio (
  id_socio BIGSERIAL PRIMARY KEY,
  dni TEXT NOT NULL,
  nro_socio TEXT NOT NULL,
  nombre_completo TEXT NOT NULL
);

-- Crear tabla libro
CREATE TABLE libro (
  id_libro BIGSERIAL PRIMARY KEY,
  isbn TEXT NOT NULL,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('disponible', 'prestado'))
);

-- Crear tabla prestamo
CREATE TABLE prestamo (
  id_prestamo BIGSERIAL PRIMARY KEY,
  socio_id BIGINT NOT NULL REFERENCES socio(id_socio),
  libro_id BIGINT NOT NULL REFERENCES libro(id_libro),
  fecha_inicio DATE NOT NULL,
  fecha_devolucion DATE
);

-- Crear tabla multa
CREATE TABLE multa (
  id_multa BIGSERIAL PRIMARY KEY,
  prestamo_id BIGINT NOT NULL REFERENCES prestamo(id_prestamo),
  fecha DATE NOT NULL,
  monto NUMERIC NOT NULL,
  motivo TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'pagada'))
);

-- Insertar bibliotecario por defecto (IMPORTANTE: Cambia la contraseña después)
INSERT INTO bibliotecario (usuario, password, nombre_completo) VALUES
  ('admin', 'admin123', 'Administrador del Sistema');

-- Insertar datos de ejemplo (opcional)
INSERT INTO libro (isbn, titulo, autor, estado) VALUES
  ('978-0-123456-78-9', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'disponible'),
  ('978-0-987654-32-1', 'Cien años de soledad', 'Gabriel García Márquez', 'disponible'),
  ('978-0-111111-11-1', '1984', 'George Orwell', 'disponible');
```

4. Copia tu **URL de Supabase** y tu **Anon Key** desde Project Settings > API

### 2. Configurar el Backend

1. Navega a la carpeta del backend:
```powershell
cd backend
```

2. Instala las dependencias:
```powershell
npm install
```

3. Crea un archivo `.env` copiando el `.env.example`:
```powershell
copy .env.example .env
```

4. Edita el archivo `.env` con tus credenciales de Supabase:
```env
SUPABASE_URL=tu_supabase_url_aqui
SUPABASE_KEY=tu_supabase_anon_key_aqui
PORT=3000
```

5. Inicia el servidor:
```powershell
npm start
```

El backend estará corriendo en `http://localhost:3000`

### 3. Configurar el Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
```powershell
cd frontend
```

2. Instala las dependencias:
```powershell
npm install
```

3. Crea un archivo `.env` copiando el `.env.example`:
```powershell
copy .env.example .env
```

4. Edita el archivo `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

5. Inicia el servidor de desarrollo:
```powershell
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## � Inicio de Sesión

Una vez que el backend y frontend estén funcionando:

1. Abre tu navegador en `http://localhost:5173`
2. Verás la pantalla de login
3. Ingresa las credenciales por defecto:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
4. Click en "Iniciar Sesión"

**⚠️ Importante**: Por seguridad, se recomienda cambiar la contraseña del usuario admin en la base de datos después de la primera configuración.

## �📖 Funcionalidades Implementadas

### 0. Autenticación de Bibliotecario
- Sistema de login con usuario y contraseña
- Sesión persistente en localStorage
- Protección de todas las rutas del sistema
- Botón de cerrar sesión en el header
- **Credenciales por defecto**: Usuario: `admin`, Contraseña: `admin123`

### 1. Alta de Socio
- Formulario para registrar nuevos socios
- Validación de DNI duplicado
- Simulación de envío de email de confirmación

### 2. Préstamo de Libro
- Búsqueda de libros por título o autor
- **Visualización de cantidad de copias disponibles/totales** para cada libro
- Verificación de disponibilidad del libro
- **Selección de ejemplar específico** entre las copias disponibles
- Identificación del socio por DNI o número de socio
- **Establecer fecha límite de devolución** (obligatorio, debe ser posterior a hoy)
- Registro del préstamo y actualización del estado del libro
- Validación de fecha límite futura

### 3. Devolución de Libro
- **Tabla de préstamos activos** con todos los préstamos pendientes de devolución
- **Búsqueda por socio** (nombre, DNI o número de socio) con filtrado en tiempo real
- **Selección directa** desde la tabla de préstamos
- **Visualización de fecha límite de devolución** con indicador de estado:
  - 🟢 Verde: Quedan más de 3 días
  - 🟡 Amarillo: Vence en 3 días o menos
  - 🔴 Rojo: Atrasado (pasó la fecha límite)
- Búsqueda alternativa por ID de libro o ISBN
- Inspección del estado del libro (dañado o no)
- Registro de multas por daños ($500)
- Simulación de emails de confirmación o multa

## 🔌 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión (body: { usuario, password })
- `POST /api/auth/logout` - Cerrar sesión

### Socios
- `POST /api/socios` - Crear un nuevo socio
- `GET /api/socios` - Obtener todos los socios
- `GET /api/socios/:identificador` - Buscar socio por DNI o número

### Libros
- `GET /api/libros` - Obtener todos los libros
- `GET /api/libros/buscar?termino=xxx` - Buscar libros por título o autor
- `GET /api/libros/:id` - Buscar libro por ID
- `GET /api/libros/isbn/:isbn` - Buscar libro por ISBN

### Préstamos
- `POST /api/prestamos` - Registrar un préstamo (body: { socio_id, libro_id, fecha_devolucion_limite })
- `POST /api/prestamos/devolucion` - Registrar una devolución
- `GET /api/prestamos` - Obtener todos los préstamos
- `GET /api/prestamos/activos` - Obtener préstamos activos
- `GET /api/prestamos/libro/:libroId` - Buscar préstamo activo por libro
- `GET /api/prestamos/socio/:identificador` - Buscar préstamos activos por socio (DNI o nro_socio)

## 🛡️ Buenas Prácticas Implementadas

1. **Arquitectura en Capas**: Separación clara entre presentación, lógica de negocio y datos
2. **Validación de Datos**: Validaciones en backend antes de operaciones de BD
3. **Manejo de Errores**: Try-catch en todas las operaciones con mensajes claros
4. **Separación de Responsabilidades**: Controladores solo llaman a servicios
5. **Código DRY**: Funciones reutilizables y componentes compartidos
6. **Seguridad**: Helmet para headers de seguridad, CORS configurado
7. **Variables de Entorno**: Credenciales sensibles en archivos .env

## 🧪 Pruebas

### Probar el Backend directamente (opcional)

Puedes usar herramientas como Postman o curl para probar los endpoints:

```powershell
# Iniciar sesión
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"usuario\":\"admin\",\"password\":\"admin123\"}"

# Crear un socio
curl -X POST http://localhost:3000/api/socios -H "Content-Type: application/json" -d "{\"dni\":\"12345678\",\"nro_socio\":\"SOC001\",\"nombre_completo\":\"Juan Perez\"}"

# Buscar libros
curl "http://localhost:3000/api/libros/buscar?termino=Quijote"
```

## 📝 Notas Adicionales

- **Autenticación**: El sistema usa autenticación simple con usuario y contraseña almacenados en Supabase
- **Sesión**: La sesión se mantiene en localStorage del navegador
- **Seguridad**: Las contraseñas están almacenadas en texto plano (para simplificar). En producción, se recomienda hashear las contraseñas
- Los emails son simulados mediante `console.log` en el backend
- El monto de multa por daño está fijado en $500
- El sistema valida todos los flujos según el diagrama de actividad especificado
- Las fechas se manejan en formato ISO (YYYY-MM-DD)
- **Credenciales por defecto**: Usuario `admin`, contraseña `admin123`

## 🤝 Contribuciones

Este es un proyecto universitario con fines educativos.

## 📄 Licencia

MIT License - Proyecto Universitario 2025

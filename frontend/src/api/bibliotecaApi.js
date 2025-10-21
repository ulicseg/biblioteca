/**
 * Cliente API para comunicarse con el backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Función auxiliar para hacer peticiones HTTP
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * API de Autenticación
 */
export const authAPI = {
  // Iniciar sesión
  login: async (usuario, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usuario, password }),
    });
  },

  // Cerrar sesión
  logout: async () => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * API de Socios
 */
export const sociosAPI = {
  // Crear un nuevo socio
  crear: async (datosSocio) => {
    return fetchAPI('/socios', {
      method: 'POST',
      body: JSON.stringify(datosSocio),
    });
  },

  // Obtener todos los socios
  obtenerTodos: async () => {
    return fetchAPI('/socios');
  },

  // Buscar socio por DNI o número de socio
  buscar: async (identificador) => {
    return fetchAPI(`/socios/${identificador}`);
  },
};

/**
 * API de Libros
 */
export const librosAPI = {
  // Buscar libros por término (título o autor)
  buscar: async (termino) => {
    return fetchAPI(`/libros/buscar?termino=${encodeURIComponent(termino)}`);
  },

  // Obtener todos los libros
  obtenerTodos: async () => {
    return fetchAPI('/libros');
  },

  // Buscar libro por ID
  buscarPorId: async (id) => {
    return fetchAPI(`/libros/${id}`);
  },

  // Buscar libro por ISBN
  buscarPorIsbn: async (isbn) => {
    return fetchAPI(`/libros/isbn/${isbn}`);
  },
};

/**
 * API de Préstamos
 */
export const prestamosAPI = {
  // Registrar un nuevo préstamo
  registrar: async (socioId, libroId, fechaDevolucionLimite) => {
    return fetchAPI('/prestamos', {
      method: 'POST',
      body: JSON.stringify({
        socio_id: socioId,
        libro_id: libroId,
        fecha_devolucion_limite: fechaDevolucionLimite,
      }),
    });
  },

  // Registrar devolución de un libro
  registrarDevolucion: async (libroId, libroDanado = false) => {
    return fetchAPI('/prestamos/devolucion', {
      method: 'POST',
      body: JSON.stringify({
        libro_id: libroId,
        libro_danado: libroDanado,
      }),
    });
  },

  // Obtener todos los préstamos
  obtenerTodos: async () => {
    return fetchAPI('/prestamos');
  },

  // Obtener préstamos activos
  obtenerActivos: async () => {
    return fetchAPI('/prestamos/activos');
  },

  // Buscar préstamo activo por libro
  buscarActivoPorLibro: async (libroId) => {
    return fetchAPI(`/prestamos/libro/${libroId}`);
  },

  // Buscar préstamos activos por socio
  buscarActivosPorSocio: async (identificador) => {
    return fetchAPI(`/prestamos/socio/${identificador}`);
  },
};

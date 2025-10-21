import { supabase } from '../database/supabaseClient.js';

/**
 * Servicio para gestionar libros
 */

/**
 * Busca libros por título o autor
 * Agrupa por título + autor y muestra información de copias disponibles
 * @param {string} termino - Término de búsqueda
 * @returns {Promise<Array>} - Lista de libros agrupados con conteo de copias
 */
export const buscarLibros = async (termino) => {
  try {
    if (!termino) {
      throw new Error('Debe proporcionar un término de búsqueda');
    }

    const { data, error } = await supabase
      .from('libro')
      .select('*')
      .or(`titulo.ilike.%${termino}%,autor.ilike.%${termino}%`);

    if (error) {
      throw error;
    }

    // Agrupar por título + autor (no por ISBN, ya que puede haber diferentes ediciones)
    const librosAgrupados = {};
    
    data.forEach(libro => {
      // Crear clave única con título y autor (normalizado)
      const clave = `${libro.titulo.toLowerCase().trim()}|${libro.autor.toLowerCase().trim()}`;
      
      if (!librosAgrupados[clave]) {
        librosAgrupados[clave] = {
          isbn: libro.isbn, // Usar el ISBN del primer ejemplar encontrado
          titulo: libro.titulo,
          autor: libro.autor,
          copias: [],
          total_copias: 0,
          copias_disponibles: 0
        };
      }
      
      librosAgrupados[clave].copias.push(libro);
      librosAgrupados[clave].total_copias++;
      
      if (libro.estado === 'disponible') {
        librosAgrupados[clave].copias_disponibles++;
      }
    });

    // Convertir objeto a array
    return Object.values(librosAgrupados);
  } catch (error) {
    throw new Error(`Error al buscar libros: ${error.message}`);
  }
};

/**
 * Busca un libro por ID
 * @param {number} idLibro - ID del libro
 * @returns {Promise<Object|null>} - Libro encontrado o null
 */
export const buscarLibroPorId = async (idLibro) => {
  try {
    if (!idLibro) {
      throw new Error('Debe proporcionar un ID de libro');
    }

    const { data, error } = await supabase
      .from('libro')
      .select('*')
      .eq('id_libro', idLibro)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al buscar libro: ${error.message}`);
  }
};

/**
 * Busca un libro por ISBN (devuelve la primera copia disponible)
 * @param {string} isbn - ISBN del libro
 * @returns {Promise<Object|null>} - Primera copia disponible o null
 */
export const buscarLibroPorIsbn = async (isbn) => {
  try {
    if (!isbn) {
      throw new Error('Debe proporcionar un ISBN');
    }

    // Buscar primera copia disponible con este ISBN
    const { data, error } = await supabase
      .from('libro')
      .select('*')
      .eq('isbn', isbn)
      .eq('estado', 'disponible')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al buscar libro por ISBN: ${error.message}`);
  }
};

/**
 * Verifica si un libro está disponible
 * @param {number} idLibro - ID del libro
 * @returns {Promise<boolean>} - true si está disponible, false si no
 */
export const verificarDisponibilidadLibro = async (idLibro) => {
  try {
    const libro = await buscarLibroPorId(idLibro);
    
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    return libro.estado === 'disponible';
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Actualiza el estado de un libro
 * @param {number} idLibro - ID del libro
 * @param {string} nuevoEstado - Nuevo estado ('disponible' o 'prestado')
 * @returns {Promise<Object>} - Libro actualizado
 */
export const actualizarEstadoLibro = async (idLibro, nuevoEstado) => {
  try {
    if (!['disponible', 'prestado'].includes(nuevoEstado)) {
      throw new Error('Estado inválido. Debe ser "disponible" o "prestado"');
    }

    const { data, error } = await supabase
      .from('libro')
      .update({ estado: nuevoEstado })
      .eq('id_libro', idLibro)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al actualizar estado del libro: ${error.message}`);
  }
};

/**
 * Obtiene todos los libros (agrupados por título + autor con conteo de copias)
 * @returns {Promise<Array>} - Lista de libros agrupados
 */
export const obtenerTodosLibros = async () => {
  try {
    const { data, error } = await supabase
      .from('libro')
      .select('*')
      .order('titulo', { ascending: true });

    if (error) {
      throw error;
    }

    // Agrupar por título + autor (no por ISBN)
    const librosAgrupados = {};
    
    data.forEach(libro => {
      // Crear clave única con título y autor (normalizado)
      const clave = `${libro.titulo.toLowerCase().trim()}|${libro.autor.toLowerCase().trim()}`;
      
      if (!librosAgrupados[clave]) {
        librosAgrupados[clave] = {
          isbn: libro.isbn,
          titulo: libro.titulo,
          autor: libro.autor,
          copias: [],
          total_copias: 0,
          copias_disponibles: 0
        };
      }
      
      librosAgrupados[clave].copias.push(libro);
      librosAgrupados[clave].total_copias++;
      
      if (libro.estado === 'disponible') {
        librosAgrupados[clave].copias_disponibles++;
      }
    });

    return Object.values(librosAgrupados);
  } catch (error) {
    throw new Error(`Error al obtener libros: ${error.message}`);
  }
};

import * as librosService from '../services/libros.service.js';

/**
 * Controlador para buscar libros por título o autor
 */
export const buscarLibros = async (req, res) => {
  try {
    const { termino } = req.query;

    if (!termino) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un término de búsqueda'
      });
    }

    const libros = await librosService.buscarLibros(termino);

    if (libros.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: libros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para buscar un libro por ID
 */
export const buscarLibroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const libro = await librosService.buscarLibroPorId(parseInt(id));

    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para buscar un libro por ISBN
 */
export const buscarLibroPorIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;

    const libro = await librosService.buscarLibroPorIsbn(isbn);

    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener todos los libros
 */
export const obtenerLibros = async (req, res) => {
  try {
    const libros = await librosService.obtenerTodosLibros();

    res.status(200).json({
      success: true,
      data: libros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

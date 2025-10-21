import * as sociosService from '../services/socios.service.js';

/**
 * Controlador para crear un nuevo socio
 */
export const crearSocio = async (req, res) => {
  try {
    const { dni, nro_socio, nombre_completo } = req.body;

    const nuevoSocio = await sociosService.crearSocio({
      dni,
      nro_socio,
      nombre_completo
    });

    res.status(201).json({
      success: true,
      data: nuevoSocio,
      mensaje: 'Socio creado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para buscar un socio por DNI o número de socio
 */
export const buscarSocio = async (req, res) => {
  try {
    const { identificador } = req.params;

    const socio = await sociosService.buscarSocioPorIdentificador(identificador);

    if (!socio) {
      return res.status(404).json({
        success: false,
        error: 'Socio no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: socio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener todos los socios
 */
export const obtenerSocios = async (req, res) => {
  try {
    const socios = await sociosService.obtenerTodosSocios();

    res.status(200).json({
      success: true,
      data: socios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

import { supabase } from '../database/supabaseClient.js';
import * as sociosService from './socios.service.js';
import * as librosService from './libros.service.js';

/**
 * Servicio para gestionar préstamos y devoluciones
 */

/**
 * Registra un nuevo préstamo
 * @param {number} socioId - ID del socio
 * @param {number} libroId - ID del libro
 * @param {string} fechaDevolucionLimite - Fecha límite de devolución (formato YYYY-MM-DD)
 * @returns {Promise<Object>} - Préstamo creado
 */
export const registrarPrestamo = async (socioId, libroId, fechaDevolucionLimite) => {
  try {
    // Validar datos de entrada
    if (!socioId || !libroId || !fechaDevolucionLimite) {
      throw new Error('Debe proporcionar el ID del socio, del libro y la fecha límite de devolución');
    }

    // Validar que la fecha límite sea posterior a hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaLimite = new Date(fechaDevolucionLimite);
    
    if (fechaLimite <= hoy) {
      throw new Error('La fecha límite de devolución debe ser posterior a hoy');
    }

    // Verificar que el socio existe
    const { data: socio } = await supabase
      .from('socio')
      .select('*')
      .eq('id_socio', socioId)
      .single();

    if (!socio) {
      throw new Error('Socio no registrado');
    }

    // Verificar que el libro existe y está disponible
    const libro = await librosService.buscarLibroPorId(libroId);
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    if (libro.estado !== 'disponible') {
      throw new Error('El libro no está disponible');
    }

    // Crear el préstamo
    const fechaInicio = new Date().toISOString().split('T')[0];
    
    const { data: prestamo, error: errorPrestamo } = await supabase
      .from('prestamo')
      .insert([{
        socio_id: socioId,
        libro_id: libroId,
        fecha_inicio: fechaInicio,
        fecha_devolucion_limite: fechaDevolucionLimite,
        fecha_devolucion: null
      }])
      .select()
      .single();

    if (errorPrestamo) {
      throw errorPrestamo;
    }

    // Actualizar el estado del libro a 'prestado'
    await librosService.actualizarEstadoLibro(libroId, 'prestado');

    return prestamo;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca un préstamo activo por ID de libro
 * @param {number} libroId - ID del libro
 * @returns {Promise<Object|null>} - Préstamo activo o null
 */
export const buscarPrestamoActivoPorLibro = async (libroId) => {
  try {
    const { data, error } = await supabase
      .from('prestamo')
      .select('*, socio(*), libro(*)')
      .eq('libro_id', libroId)
      .is('fecha_devolucion', null)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al buscar préstamo activo: ${error.message}`);
  }
};

/**
 * Registra la devolución de un libro
 * @param {number} libroId - ID del libro
 * @param {boolean} libroDanado - Indica si el libro está dañado
 * @returns {Promise<Object>} - Resultado de la devolución
 */
export const registrarDevolucion = async (libroId, libroDanado = false) => {
  try {
    // Validar datos de entrada
    if (!libroId) {
      throw new Error('Debe proporcionar el ID del libro');
    }

    // Buscar préstamo activo
    const prestamoActivo = await buscarPrestamoActivoPorLibro(libroId);
    
    if (!prestamoActivo) {
      throw new Error('Error: Este libro no figura con un préstamo activo');
    }

    // Actualizar el préstamo con la fecha de devolución
    const fechaDevolucion = new Date().toISOString().split('T')[0];
    
    const { data: prestamoActualizado, error: errorActualizar } = await supabase
      .from('prestamo')
      .update({ fecha_devolucion: fechaDevolucion })
      .eq('id_prestamo', prestamoActivo.id_prestamo)
      .select()
      .single();

    if (errorActualizar) {
      throw errorActualizar;
    }

    // Actualizar el estado del libro a 'disponible'
    await librosService.actualizarEstadoLibro(libroId, 'disponible');

    // Si el libro está dañado, crear una multa
    if (libroDanado) {
      const multa = await crearMulta(
        prestamoActivo.id_prestamo,
        500,
        'Daño por devolución'
      );

      // Simular envío de email de multa
      console.log(`Simulando email de multa a ${prestamoActivo.socio.nombre_completo} (Monto: $${multa.monto})`);

      return {
        prestamo: prestamoActualizado,
        multa: multa,
        mensaje: 'Devolución registrada con multa por daño'
      };
    }

    // Simular envío de email de confirmación de devolución
    console.log(`Simulando email de confirmación de devolución a ${prestamoActivo.socio.nombre_completo}`);

    return {
      prestamo: prestamoActualizado,
      mensaje: 'Devolución confirmada'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Crea una multa
 * @param {number} prestamoId - ID del préstamo
 * @param {number} monto - Monto de la multa
 * @param {string} motivo - Motivo de la multa
 * @returns {Promise<Object>} - Multa creada
 */
export const crearMulta = async (prestamoId, monto, motivo) => {
  try {
    const fecha = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('multa')
      .insert([{
        prestamo_id: prestamoId,
        fecha: fecha,
        monto: monto,
        motivo: motivo,
        estado: 'pendiente'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al crear multa: ${error.message}`);
  }
};

/**
 * Obtiene todos los préstamos
 * @returns {Promise<Array>} - Lista de préstamos
 */
export const obtenerTodosPrestamos = async () => {
  try {
    const { data, error } = await supabase
      .from('prestamo')
      .select('*, socio(*), libro(*)')
      .order('id_prestamo', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al obtener préstamos: ${error.message}`);
  }
};

/**
 * Obtiene préstamos activos (sin devolver)
 * @returns {Promise<Array>} - Lista de préstamos activos
 */
export const obtenerPrestamosActivos = async () => {
  try {
    const { data, error } = await supabase
      .from('prestamo')
      .select('*, socio(*), libro(*)')
      .is('fecha_devolucion', null)
      .order('fecha_inicio', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al obtener préstamos activos: ${error.message}`);
  }
};

/**
 * Obtiene préstamos activos de un socio específico
 * @param {string} identificadorSocio - DNI o número de socio
 * @returns {Promise<Array>} - Lista de préstamos activos del socio
 */
export const obtenerPrestamosActivosPorSocio = async (identificadorSocio) => {
  try {
    // Primero buscar el socio
    const socio = await sociosService.buscarSocioPorIdentificador(identificadorSocio);
    
    if (!socio) {
      throw new Error('Socio no encontrado');
    }

    // Buscar préstamos activos del socio
    const { data, error } = await supabase
      .from('prestamo')
      .select('*, socio(*), libro(*)')
      .eq('socio_id', socio.id_socio)
      .is('fecha_devolucion', null)
      .order('fecha_inicio', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

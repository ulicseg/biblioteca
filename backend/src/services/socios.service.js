import { supabase } from '../database/supabaseClient.js';

/**
 * Servicio para gestionar socios
 */

/**
 * Verifica si un DNI ya existe en la base de datos
 * @param {string} dni - DNI del socio
 * @returns {Promise<boolean>} - true si existe, false si no
 */
export const verificarDniExistente = async (dni) => {
  try {
    const { data, error } = await supabase
      .from('socio')
      .select('id_socio')
      .eq('dni', dni)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 es "no rows returned"
      throw error;
    }

    return data !== null;
  } catch (error) {
    throw new Error(`Error al verificar DNI: ${error.message}`);
  }
};

/**
 * Crea un nuevo socio en la base de datos
 * @param {Object} datosSocio - Datos del socio (dni, nro_socio, nombre_completo)
 * @returns {Promise<Object>} - Socio creado
 */
export const crearSocio = async (datosSocio) => {
  try {
    // Validar datos de entrada
    if (!datosSocio.dni || !datosSocio.nro_socio || !datosSocio.nombre_completo) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Verificar si el DNI ya existe
    const dniExiste = await verificarDniExistente(datosSocio.dni);
    if (dniExiste) {
      throw new Error('Error: El DNI ya se encuentra registrado');
    }

    // Crear el socio
    const { data, error } = await supabase
      .from('socio')
      .insert([{
        dni: datosSocio.dni,
        nro_socio: datosSocio.nro_socio,
        nombre_completo: datosSocio.nombre_completo
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Simular envío de email de confirmación
    console.log(`Simulando email de alta a ${datosSocio.nombre_completo} (DNI: ${datosSocio.dni})`);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Busca un socio por DNI o número de socio
 * @param {string} identificador - DNI o número de socio
 * @returns {Promise<Object|null>} - Socio encontrado o null
 */
export const buscarSocioPorIdentificador = async (identificador) => {
  try {
    if (!identificador) {
      throw new Error('Debe proporcionar un DNI o número de socio');
    }

    // Buscar por DNI o nro_socio
    const { data, error } = await supabase
      .from('socio')
      .select('*')
      .or(`dni.eq.${identificador},nro_socio.eq.${identificador}`)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al buscar socio: ${error.message}`);
  }
};

/**
 * Obtiene todos los socios
 * @returns {Promise<Array>} - Lista de socios
 */
export const obtenerTodosSocios = async () => {
  try {
    const { data, error } = await supabase
      .from('socio')
      .select('*')
      .order('id_socio', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(`Error al obtener socios: ${error.message}`);
  }
};

import { supabase } from '../database/supabaseClient.js';

/**
 * Servicio para gestionar autenticación de bibliotecarios
 */

/**
 * Verifica las credenciales del bibliotecario
 * @param {string} usuario - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - Datos del bibliotecario si es válido
 */
export const verificarCredenciales = async (usuario, password) => {
  try {
    if (!usuario || !password) {
      throw new Error('Usuario y contraseña son obligatorios');
    }

    // Buscar bibliotecario por usuario y contraseña
    const { data, error } = await supabase
      .from('bibliotecario')
      .select('id_bibliotecario, usuario, nombre_completo')
      .eq('usuario', usuario)
      .eq('password', password)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Crea un nuevo bibliotecario (solo para configuración inicial)
 * @param {Object} datosBibliotecario - Datos del bibliotecario
 * @returns {Promise<Object>} - Bibliotecario creado
 */
export const crearBibliotecario = async (datosBibliotecario) => {
  try {
    const { usuario, password, nombre_completo } = datosBibliotecario;

    if (!usuario || !password || !nombre_completo) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Verificar si el usuario ya existe
    const { data: existente } = await supabase
      .from('bibliotecario')
      .select('id_bibliotecario')
      .eq('usuario', usuario)
      .single();

    if (existente) {
      throw new Error('El usuario ya existe');
    }

    // Crear el bibliotecario
    const { data, error } = await supabase
      .from('bibliotecario')
      .insert([{
        usuario,
        password,
        nombre_completo
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

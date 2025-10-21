import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import BookCard from '../components/BookCard';
import { librosAPI, sociosAPI, prestamosAPI } from '../api/bibliotecaApi';

/**
 * Página para realizar préstamos de libros
 */
const RealizarPrestamo = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [librosEncontrados, setLibrosEncontrados] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [copiaSeleccionada, setCopiaSeleccionada] = useState(null);
  const [identificadorSocio, setIdentificadorSocio] = useState('');
  const [socioEncontrado, setSocioEncontrado] = useState(null);
  const [fechaDevolucionLimite, setFechaDevolucionLimite] = useState('');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [cargando, setCargando] = useState(false);

  // Buscar libros
  const handleBuscarLibros = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setLibrosEncontrados([]);
    setLibroSeleccionado(null);

    if (!terminoBusqueda.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor ingrese un término de búsqueda' });
      return;
    }

    setCargando(true);
    try {
      const response = await librosAPI.buscar(terminoBusqueda);
      setLibrosEncontrados(response.data);
      
      if (response.data.length === 0) {
        setMensaje({ tipo: 'error', texto: 'Libro no encontrado' });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error al buscar libros' });
    } finally {
      setCargando(false);
    }
  };

  // Seleccionar libro
  const handleSeleccionarLibro = (libro) => {
    if (libro.copias_disponibles === 0) {
      setMensaje({ tipo: 'error', texto: 'No hay copias disponibles de este libro' });
      return;
    }
    setLibroSeleccionado(libro);
    
    // Seleccionar automáticamente la primera copia disponible
    const primeraDisponible = libro.copias.find(copia => copia.estado === 'disponible');
    setCopiaSeleccionada(primeraDisponible || null);
    
    setMensaje({ tipo: '', texto: '' });
  };

  // Buscar socio
  const handleBuscarSocio = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setSocioEncontrado(null);

    if (!identificadorSocio.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor ingrese un DNI o número de socio' });
      return;
    }

    setCargando(true);
    try {
      const response = await sociosAPI.buscar(identificadorSocio);
      setSocioEncontrado(response.data);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Socio no registrado' });
      setSocioEncontrado(null);
    } finally {
      setCargando(false);
    }
  };

  // Registrar préstamo
  const handleRegistrarPrestamo = async () => {
    if (!libroSeleccionado || !socioEncontrado) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar un libro y un socio' });
      return;
    }

    if (!fechaDevolucionLimite) {
      setMensaje({ tipo: 'error', texto: 'Debe seleccionar una fecha límite de devolución' });
      return;
    }

    // Validar que la fecha límite sea futura
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaLimite = new Date(fechaDevolucionLimite);
    
    if (fechaLimite <= hoy) {
      setMensaje({ tipo: 'error', texto: 'La fecha límite debe ser posterior a hoy' });
      return;
    }

    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await prestamosAPI.registrar(
        socioEncontrado.id_socio,
        copiaSeleccionada.id_libro,
        fechaDevolucionLimite
      );

      setMensaje({
        tipo: 'success',
        texto: `Préstamo registrado exitosamente. El libro "${libroSeleccionado.titulo}" ha sido entregado a ${socioEncontrado.nombre_completo}. Fecha límite de devolución: ${new Date(fechaDevolucionLimite).toLocaleDateString('es-AR')}`
      });

      // Limpiar formulario
      setTerminoBusqueda('');
      setLibrosEncontrados([]);
      setLibroSeleccionado(null);
      setCopiaSeleccionada(null);
      setIdentificadorSocio('');
      setSocioEncontrado(null);
      setFechaDevolucionLimite('');
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error al registrar préstamo' });
    } finally {
      setCargando(false);
    }
  };

  const pageStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '16px',
  };

  const mensajeStyle = {
    padding: '12px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: mensaje.tipo === 'success' ? '#d4edda' : '#f8d7da',
    color: mensaje.tipo === 'success' ? '#155724' : '#721c24',
    border: `1px solid ${mensaje.tipo === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
  };

  const infoCardStyle = {
    backgroundColor: '#e7f3ff',
    padding: '16px',
    borderRadius: '5px',
    marginTop: '16px',
    border: '1px solid #b3d9ff',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Realizar Préstamo</h1>

      {mensaje.texto && (
        <div style={mensajeStyle}>
          {mensaje.texto}
        </div>
      )}

      {/* Sección 1: Buscar Libro */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>1. Buscar Libro</h2>
        <form onSubmit={handleBuscarLibros}>
          <Input
            label="Buscar por título o autor"
            type="text"
            name="busqueda"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            placeholder="Ej: Don Quijote, Cervantes..."
          />
          <Button type="submit" variant="primary" disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar'}
          </Button>
        </form>

        {librosEncontrados.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Resultados:</h3>
            {librosEncontrados.map(libro => (
              <BookCard
                key={libro.isbn}
                libro={libro}
                showSelect={true}
                onSelect={handleSeleccionarLibro}
              />
            ))}
          </div>
        )}

        {libroSeleccionado && (
          <div style={infoCardStyle}>
            <strong>✓ Libro seleccionado:</strong> {libroSeleccionado.titulo}
          </div>
        )}
      </div>

      {/* Sección 2: Buscar Socio */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>2. Identificar Socio</h2>
        <form onSubmit={handleBuscarSocio}>
          <Input
            label="DNI o Número de Socio"
            type="text"
            name="identificador"
            value={identificadorSocio}
            onChange={(e) => setIdentificadorSocio(e.target.value)}
            placeholder="Ej: 12345678 o SOC001"
          />
          <Button type="submit" variant="primary" disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar Socio'}
          </Button>
        </form>

        {socioEncontrado && (
          <div style={infoCardStyle}>
            <div><strong>✓ Socio encontrado:</strong></div>
            <div>Nombre: {socioEncontrado.nombre_completo}</div>
            <div>DNI: {socioEncontrado.dni}</div>
            <div>Nº Socio: {socioEncontrado.nro_socio}</div>
          </div>
        )}
      </div>

      {/* Sección 3: Confirmar Préstamo */}
      {libroSeleccionado && copiaSeleccionada && socioEncontrado && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>3. Establecer Fecha de Devolución</h2>
          <Input
            label="Fecha límite de devolución"
            type="date"
            name="fechaDevolucionLimite"
            value={fechaDevolucionLimite}
            onChange={(e) => setFechaDevolucionLimite(e.target.value)}
            min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
          />
          
          <div style={{ marginTop: '20px' }}>
            <h2 style={sectionTitleStyle}>4. Confirmar Préstamo</h2>
            <p>¿Desea registrar el préstamo del libro <strong>"{libroSeleccionado.titulo}"</strong> al socio <strong>{socioEncontrado.nombre_completo}</strong>?</p>
            {fechaDevolucionLimite && (
              <p style={{ color: '#666', fontSize: '14px' }}>
                Fecha límite de devolución: <strong>{new Date(fechaDevolucionLimite).toLocaleDateString('es-AR')}</strong>
              </p>
            )}
            <Button
              onClick={handleRegistrarPrestamo}
              variant="success"
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Confirmar y Entregar Libro'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealizarPrestamo;

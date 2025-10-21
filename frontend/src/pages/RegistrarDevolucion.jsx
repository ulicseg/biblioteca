import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { librosAPI, prestamosAPI } from '../api/bibliotecaApi';

/**
 * Página para registrar devoluciones de libros
 */
const RegistrarDevolucion = () => {
  const [prestamosActivos, setPrestamosActivos] = useState([]);
  const [prestamosFiltrados, setPrestamosFiltrados] = useState([]);
  const [filtroSocio, setFiltroSocio] = useState('');
  const [identificadorLibro, setIdentificadorLibro] = useState('');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [libroDanado, setLibroDanado] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [cargando, setCargando] = useState(false);
  const [cargandoTabla, setCargandoTabla] = useState(true);

  // Cargar préstamos activos al montar el componente
  useEffect(() => {
    cargarPrestamosActivos();
  }, []);

  // Filtrar préstamos cuando cambia el filtro de socio
  useEffect(() => {
    if (filtroSocio.trim() === '') {
      setPrestamosFiltrados(prestamosActivos);
    } else {
      const filtrados = prestamosActivos.filter(prestamo => 
        prestamo.socio.nombre_completo.toLowerCase().includes(filtroSocio.toLowerCase()) ||
        prestamo.socio.dni.includes(filtroSocio) ||
        prestamo.socio.nro_socio.toLowerCase().includes(filtroSocio.toLowerCase())
      );
      setPrestamosFiltrados(filtrados);
    }
  }, [filtroSocio, prestamosActivos]);

  const cargarPrestamosActivos = async () => {
    setCargandoTabla(true);
    try {
      const response = await prestamosAPI.obtenerActivos();
      setPrestamosActivos(response.data);
      setPrestamosFiltrados(response.data);
    } catch (error) {
      console.error('Error al cargar préstamos activos:', error);
    } finally {
      setCargandoTabla(false);
    }
  };

  // Seleccionar préstamo desde la tabla
  const handleSeleccionarPrestamo = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setLibroDanado(false);
    setMensaje({ tipo: '', texto: '' });
  };

  // Buscar préstamo activo por ID o ISBN de libro
  const handleBuscarPrestamo = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });
    setPrestamoSeleccionado(null);
    setLibroDanado(false);

    if (!identificadorLibro.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor ingrese un ID de libro o ISBN' });
      return;
    }

    setCargando(true);
    try {
      let libro = null;
      
      if (!isNaN(identificadorLibro)) {
        try {
          const response = await librosAPI.buscarPorId(parseInt(identificadorLibro));
          libro = response.data;
        } catch (error) {}
      }
      
      if (!libro) {
        try {
          const response = await librosAPI.buscarPorIsbn(identificadorLibro);
          libro = response.data;
        } catch (error) {
          throw new Error('Libro no encontrado');
        }
      }

      if (!libro) {
        throw new Error('Libro no encontrado');
      }

      const responsePrestamo = await prestamosAPI.buscarActivoPorLibro(libro.id_libro);
      setPrestamoSeleccionado(responsePrestamo.data);
      
    } catch (error) {
      setMensaje({ 
        tipo: 'error', 
        texto: error.message || 'Error: Este libro no figura con un préstamo activo' 
      });
      setPrestamoSeleccionado(null);
    } finally {
      setCargando(false);
    }
  };

  // Registrar devolución
  const handleRegistrarDevolucion = async () => {
    if (!prestamoSeleccionado) {
      setMensaje({ tipo: 'error', texto: 'No hay un préstamo seleccionado' });
      return;
    }

    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const response = await prestamosAPI.registrarDevolucion(
        prestamoSeleccionado.libro_id,
        libroDanado
      );

      let mensajeTexto = response.mensaje;
      
      if (response.multa) {
        mensajeTexto += ` Se ha generado una multa de $${response.multa.monto} por daño en el libro.`;
      }

      setMensaje({
        tipo: 'success',
        texto: mensajeTexto
      });

      // Limpiar formulario y recargar tabla
      setIdentificadorLibro('');
      setPrestamoSeleccionado(null);
      setLibroDanado(false);
      setFiltroSocio('');
      cargarPrestamosActivos();
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error al registrar devolución' });
    } finally {
      setCargando(false);
    }
  };

  const pageStyle = {
    maxWidth: '1200px',
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

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const checkboxInputStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    cursor: 'pointer',
  };

  const checkboxLabelStyle = {
    fontSize: '16px',
    cursor: 'pointer',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Registrar Devolución</h1>

      {mensaje.texto && (
        <div style={mensajeStyle}>
          {mensaje.texto}
        </div>
      )}

      {/* Sección 1: Tabla de Préstamos Activos */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>📋 Préstamos Activos</h2>
        
        <Input
          label="Filtrar por socio (nombre, DNI o nro_socio)"
          type="text"
          name="filtro"
          value={filtroSocio}
          onChange={(e) => setFiltroSocio(e.target.value)}
          placeholder="Ej: Juan Pérez, 12345678, SOC001"
        />

        {cargandoTabla ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Cargando préstamos activos...
          </div>
        ) : prestamosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            {filtroSocio ? 'No se encontraron préstamos con ese filtro' : 'No hay préstamos activos'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Socio</th>
                  <th style={thStyle}>DNI</th>
                  <th style={thStyle}>Libro</th>
                  <th style={thStyle}>ISBN</th>
                  <th style={thStyle}>Fecha Préstamo</th>
                  <th style={thStyle}>Fecha Límite</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {prestamosFiltrados.map(prestamo => {
                  const diasPrestamo = Math.floor((new Date() - new Date(prestamo.fecha_inicio)) / (1000 * 60 * 60 * 24));
                  const fechaLimite = new Date(prestamo.fecha_devolucion_limite);
                  const hoy = new Date();
                  hoy.setHours(0, 0, 0, 0);
                  fechaLimite.setHours(0, 0, 0, 0);
                  const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
                  const estaAtrasado = diasRestantes < 0;
                  const estaPorVencer = diasRestantes >= 0 && diasRestantes <= 3;

                  return (
                    <tr key={prestamo.id_prestamo}>
                      <td style={tdStyle}>{prestamo.socio.nombre_completo}</td>
                      <td style={tdStyle}>{prestamo.socio.dni}</td>
                      <td style={tdStyle}>{prestamo.libro.titulo}</td>
                      <td style={tdStyle}>{prestamo.libro.isbn}</td>
                      <td style={tdStyle}>{new Date(prestamo.fecha_inicio).toLocaleDateString('es-AR')}</td>
                      <td style={tdStyle}>{fechaLimite.toLocaleDateString('es-AR')}</td>
                      <td style={tdStyle}>
                        <span style={{
                          ...badgeStyle,
                          backgroundColor: estaAtrasado ? '#f8d7da' : estaPorVencer ? '#fff3cd' : '#d4edda',
                          color: estaAtrasado ? '#721c24' : estaPorVencer ? '#856404' : '#155724',
                          border: `1px solid ${estaAtrasado ? '#f5c6cb' : estaPorVencer ? '#ffeeba' : '#c3e6cb'}`,
                        }}>
                          {estaAtrasado ? `Atrasado ${Math.abs(diasRestantes)} días` : 
                           estaPorVencer ? `Vence en ${diasRestantes} días` : 
                           `${diasRestantes} días restantes`}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <Button
                          onClick={() => handleSeleccionarPrestamo(prestamo)}
                          variant="primary"
                          style={{ padding: '6px 12px', fontSize: '13px' }}
                        >
                          Seleccionar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sección 2: Búsqueda Manual (Alternativa) */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>🔍 Búsqueda Manual por Libro</h2>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
          Alternativamente, puedes buscar por ID del libro o ISBN
        </p>
        <form onSubmit={handleBuscarPrestamo}>
          <Input
            label="ID del Libro o ISBN"
            type="text"
            name="identificador"
            value={identificadorLibro}
            onChange={(e) => setIdentificadorLibro(e.target.value)}
            placeholder="Ej: 1 o ISBN-12345"
          />
          <Button type="submit" variant="secondary" disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar Préstamo'}
          </Button>
        </form>
      </div>

      {/* Sección 3: Préstamo Seleccionado */}
      {prestamoSeleccionado && (
        <>
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📖 Préstamo Seleccionado</h2>
            <div style={infoCardStyle}>
              <div><strong>✓ Préstamo activo encontrado:</strong></div>
              <div style={{ marginTop: '8px' }}>
                <strong>Libro:</strong> {prestamoSeleccionado.libro.titulo}
              </div>
              <div><strong>Autor:</strong> {prestamoSeleccionado.libro.autor}</div>
              <div><strong>ISBN:</strong> {prestamoSeleccionado.libro.isbn}</div>
              <div style={{ marginTop: '8px' }}>
                <strong>Socio:</strong> {prestamoSeleccionado.socio.nombre_completo}
              </div>
              <div><strong>DNI:</strong> {prestamoSeleccionado.socio.dni}</div>
              <div style={{ marginTop: '8px' }}>
                <strong>Fecha de préstamo:</strong> {new Date(prestamoSeleccionado.fecha_inicio).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Sección 4: Inspección del Libro */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🔎 Inspección del Libro</h2>
            
            <div style={checkboxStyle}>
              <input
                type="checkbox"
                id="libroDanado"
                checked={libroDanado}
                onChange={(e) => setLibroDanado(e.target.checked)}
                style={checkboxInputStyle}
              />
              <label htmlFor="libroDanado" style={checkboxLabelStyle}>
                ¿El libro está dañado?
              </label>
            </div>

            {libroDanado && (
              <div style={{ ...infoCardStyle, backgroundColor: '#fff3cd', borderColor: '#ffeaa7' }}>
                <strong>⚠️ Atención:</strong> Se generará una multa de $500 por daño en el libro.
              </div>
            )}
          </div>

          {/* Sección 5: Confirmar Devolución */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>✅ Confirmar Devolución</h2>
            <p>
              ¿Confirma la devolución del libro <strong>"{prestamoSeleccionado.libro.titulo}"</strong>?
              {libroDanado && <span style={{ color: '#d63031' }}> (Con daños - se aplicará multa)</span>}
            </p>
            <Button
              onClick={handleRegistrarDevolucion}
              variant={libroDanado ? 'warning' : 'success'}
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Confirmar Devolución'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrarDevolucion;

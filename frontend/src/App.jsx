import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [reservas, setReservas] = useState([]);
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estados para Editar y Buscar
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Estado para el Modal de Confirmación
  const [reservaACancelar, setReservaACancelar] = useState(null);

  // Variable de entorno flexible (En local equivale a "", en Render toma la URL del backend)
  const API_URL = import.meta.env.VITE_API_URL || "";

  const obtenerReservas = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/reservas`);
      const datos = await respuesta.json();
      setReservas(datos);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  // Guardar (Crea si editandoId es null, actualiza si tiene ID)
  const guardarReserva = async (e) => {
    e.preventDefault();
    setCargando(true);

    const ruta = editandoId ? `/reservas/${editandoId}` : "/reservas";
    const method = editandoId ? "PUT" : "POST";

    try {
      const respuesta = await fetch(`${API_URL}${ruta}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cliente, servicio, fecha, hora }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.mensaje || datos.error || "Error al procesar la reserva.");
        return;
      }

      setMensaje(
        editandoId
          ? "¡Reserva actualizada correctamente!"
          : "¡Reserva creada correctamente!"
      );

      limpiarFormulario();
      obtenerReservas();
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  // Función ejecutada desde el Modal para cancelar reserva
  const confirmarCancelacion = async () => {
    if (!reservaACancelar) return;

    try {
      const respuesta = await fetch(`${API_URL}/reservas/${reservaACancelar.id}`, {
        method: "DELETE",
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.mensaje || datos.error || "Error al cancelar reserva.");
        return;
      }

      setMensaje("¡Reserva cancelada correctamente!");
      obtenerReservas();
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setReservaACancelar(null);
    }
  };

  // Función para borrar visualmente del listado una reserva cancelada
  const borrarDeLaLista = (id) => {
    setReservas((prevReservas) => prevReservas.filter((r) => r.id !== id));
    setMensaje("Reserva eliminada de la lista.");
  };

  // Cargar datos en el formulario para editar
  const prepararEdicion = (reserva) => {
    setEditandoId(reserva.id);
    setCliente(reserva.cliente);
    setServicio(reserva.servicio);
    setFecha(reserva.fecha);
    setHora(reserva.hora);
    setMensaje("");
  };

  // Limpiar campos y reiniciar estado de edición
  const limpiarFormulario = () => {
    setEditandoId(null);
    setCliente("");
    setServicio("");
    setFecha("");
    setHora("");
  };

  // Filtrar reservas según la caja de búsqueda
  const reservasFiltradas = reservas.filter(
    (r) =>
      r.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.servicio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Sistema de Reservas</h1>
        <p>Gestiona tus citas y servicios fácilmente</p>
      </header>

      <div className="grid-layout">
        {/* Formulario */}
        <section className="card">
          <h2>{editandoId ? "Editar Reserva" : "Nueva Reserva"}</h2>
          <form onSubmit={guardarReserva} className="form-group">
            <div className="field">
              <label>Cliente</label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Servicio</label>
              <input
                type="text"
                placeholder="Ej. Consulta, Corte, Mantenimiento"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label>Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Hora</label>
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={cargando}>
              {cargando
                ? "Procesando..."
                : editandoId
                  ? "Guardar cambios"
                  : "Crear reserva"}
            </button>

            {editandoId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancelar edición
              </button>
            )}
          </form>

          {mensaje && (
            <div
              className={`status-message ${mensaje.includes("correctamente") || mensaje.includes("eliminada")
                  ? "success"
                  : "error"
                }`}
            >
              {mensaje}
            </div>
          )}
        </section>

        {/* Lista de Reservas */}
        <section className="card">
          <h2>Reservas Registradas ({reservasFiltradas.length})</h2>

          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="🔍 Buscar por cliente o servicio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>

          {reservasFiltradas.length === 0 ? (
            <p className="empty-state">No hay reservas registradas en este momento.</p>
          ) : (
            <div className="reservas-list">
              {reservasFiltradas.map((reserva) => (
                <div key={reserva.id || reserva._id} className="reserva-item">
                  <div className="reserva-header">
                    <strong>{reserva.cliente}</strong>
                    <span className="badge">{reserva.estado || "ACTIVA"}</span>
                  </div>
                  <div className="reserva-details">
                    <span>📌 {reserva.servicio}</span>
                    <span>📅 {reserva.fecha}</span>
                    <span>⏰ {reserva.hora}</span>
                  </div>

                  {/* Acciones segun estado de la reserva */}
                  {reserva.estado === "CANCELADA" ? (
                    <div style={{ marginTop: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => borrarDeLaLista(reserva.id)}
                        style={{
                          padding: "0.3rem 0.6rem",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          color: "#ffffff",
                          backgroundColor: "#64748b",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        🗑️ Borrar permanentemente
                      </button>
                    </div>
                  ) : (
                    <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={() => prepararEdicion(reserva)}
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", cursor: "pointer" }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setReservaACancelar(reserva)}
                        style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem", cursor: "pointer", color: "red" }}
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal propio para confirmación */}
      {reservaACancelar && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirmar cancelación</h3>
            <p>
              ¿Estás seguro de que deseas cancelar la reserva de{" "}
              <strong>{reservaACancelar.cliente}</strong> para{" "}
              <strong>{reservaACancelar.servicio}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-cancelar" onClick={confirmarCancelacion}>
                Sí, cancelar
              </button>
              <button
                className="btn-secundario"
                onClick={() => setReservaACancelar(null)}
              >
                No, mantener
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
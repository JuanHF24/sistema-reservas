const reservaRepository = require("../repositories/ReservaRepository");

class ReservaService {

    crearReserva(datos) {

        if (!datos.cliente || datos.cliente.trim() === "") {
            throw new Error("El cliente es obligatorio.");
        }

        if (!datos.servicio || datos.servicio.trim() === "") {
            throw new Error("El servicio es obligatorio.");
        }

        if (!datos.fecha) {
            throw new Error("La fecha es obligatoria.");
        }

        if (!datos.hora) {
            throw new Error("La hora es obligatoria.");
        }

        const reservas = reservaRepository.obtenerTodas();

        const existe = reservas.find(r =>
            r.fecha === datos.fecha &&
            r.hora === datos.hora &&
            r.estado === "ACTIVA"
        );

        if (existe) {
            throw new Error("Ese horario ya está reservado.");
        }

        return reservaRepository.crear(datos);

    }

    obtenerReservas() {
        return reservaRepository.obtenerTodas();
    }

    buscarReserva(id) {

        const reserva = reservaRepository.buscarPorId(id);

        if (!reserva) {
            throw new Error("Reserva no encontrada.");
        }

        return reserva;

    }

    actualizarReserva(id, datos) {

        const reserva = reservaRepository.actualizar(id, datos);

        if (!reserva) {
            throw new Error("Reserva no encontrada.");
        }

        return reserva;

    }

    cancelarReserva(id) {

        const reserva = reservaRepository.buscarPorId(id);

        if (!reserva) {
            throw new Error("Reserva no encontrada.");
        }

        if (reserva.estado === "CANCELADA") {
            throw new Error("La reserva ya estaba cancelada.");
        }

        return reservaRepository.cancelar(id);

    }

}

module.exports = new ReservaService();
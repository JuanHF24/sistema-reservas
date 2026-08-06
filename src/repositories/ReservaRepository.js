const Reserva = require("../models/Reserva");

class ReservaRepository {
    constructor() {
        this.reservas = [];
        this.nextId = 1;
    }

    crear(datos) {
        const reserva = new Reserva(
            this.nextId++,
            datos.cliente,
            datos.fecha,
            datos.hora,
            datos.servicio
        );

        this.reservas.push(reserva);

        return reserva;
    }

    obtenerTodas() {
        return this.reservas;
    }

    limpiar() {
        this.reservas = [];
        this.nextId = 1;
    }

    buscarPorId(id) {
        return this.reservas.find(r => r.id === id);
    }

    actualizar(id, datos) {
        const reserva = this.buscarPorId(id);

        if (!reserva) {
            return null;
        }

        reserva.cliente = datos.cliente;
        reserva.fecha = datos.fecha;
        reserva.hora = datos.hora;
        reserva.servicio = datos.servicio;

        return reserva;
    }

    cancelar(id) {
        const reserva = this.buscarPorId(id);

        if (!reserva) {
            return null;
        }

        reserva.estado = "CANCELADA";

        return reserva;
    }
}

module.exports = new ReservaRepository();
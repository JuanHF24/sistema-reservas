class Reserva {

    constructor(id, cliente, fecha, hora, servicio, estado = "ACTIVA") {

        this.id = id;
        this.cliente = cliente;
        this.fecha = fecha;
        this.hora = hora;
        this.servicio = servicio;
        this.estado = estado;

    }

}

module.exports = Reserva;
const reservaService = require("../services/ReservaService");

class ReservaController {

    crear(req, res) {
        try {
            const reserva = reservaService.crearReserva(req.body);
            res.status(201).json(reserva);
        } catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
    }

    listar(req, res) {
        const reservas = reservaService.obtenerReservas();
        res.json(reservas);
    }

    buscar(req, res) {
        try {
            const reserva = reservaService.buscarReserva(Number(req.params.id));
            res.json(reserva);
        } catch (error) {
            res.status(404).json({ mensaje: error.message });
        }
    }

    actualizar(req, res) {
        try {
            const reserva = reservaService.actualizarReserva(
                Number(req.params.id),
                req.body
            );

            res.json(reserva);

        } catch (error) {

            res.status(404).json({
                mensaje: error.message
            });

        }
    }

    cancelar(req, res) {
        try {

            const reserva = reservaService.cancelarReserva(
                Number(req.params.id)
            );

            res.json(reserva);

        } catch (error) {

            res.status(404).json({
                mensaje: error.message
            });

        }
    }

}

module.exports = new ReservaController();
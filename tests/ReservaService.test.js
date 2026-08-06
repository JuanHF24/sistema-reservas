const reservaService = require("../src/services/ReservaService");
const reservaRepository = require("../src/repositories/ReservaRepository");


describe("ReservaService", () => {

    beforeEach(() => {
        reservaRepository.limpiar();
    });

    test("Debe crear una reserva correctamente", () => {

        const reserva = reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });

        expect(reserva.cliente).toBe("Juan");
        expect(reserva.estado).toBe("ACTIVA");

    });

    test("No debe permitir un cliente vacío", () => {

        expect(() => {

            reservaService.crearReserva({
                cliente: "",
                fecha: "2026-08-20",
                hora: "18:00",
                servicio: "Consulta"
            });

        }).toThrow("El cliente es obligatorio.");

    });
    test("No debe permitir un servicio vacío", () => {

        expect(() => {

            reservaService.crearReserva({
                cliente: "Juan",
                fecha: "2026-08-20",
                hora: "18:00",
                servicio: ""
            });

        }).toThrow("El servicio es obligatorio.");

    });

    test("No debe permitir la fecha vacía", () => {

        expect(() => {

            reservaService.crearReserva({
                cliente: "Juan",
                fecha: "",
                hora: "18:00",
                servicio: "Consulta"
            });

        }).toThrow("La fecha es obligatoria.");

    });

    test("No debe permitir la hora vacía", () => {

        expect(() => {

            reservaService.crearReserva({
                cliente: "Juan",
                fecha: "2026-08-20",
                hora: "",
                servicio: "Consulta"
            });

        }).toThrow("La hora es obligatoria.");

    });

    test("No debe permitir dos reservas para el mismo horario", () => {

        reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });

        expect(() => {

            reservaService.crearReserva({
                cliente: "Pedro",
                fecha: "2026-08-20",
                hora: "18:00",
                servicio: "Consulta"
            });

        }).toThrow("Ese horario ya está reservado.");

    });


    test("Debe obtener todas las reservas", () => {

        reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });



        const reservas = reservaService.obtenerReservas();
        expect(reservas[0].cliente).toBe("Juan");

    });


    test("Debe buscar una reserva por ID", () => {

        const reserva = reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });

        const encontrada = reservaService.buscarReserva(reserva.id);

        expect(encontrada.cliente).toBe("Juan");

    });

    test("Debe lanzar error si la reserva no existe", () => {

        expect(() => {

            reservaService.buscarReserva(999);

        }).toThrow("Reserva no encontrada.");

    });



    test("Debe actualizar correctamente una reserva", () => {

        const reserva = reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });

        const actualizada = reservaService.actualizarReserva(reserva.id, {
            cliente: "Pedro",
            fecha: "2026-08-20",
            hora: "19:00",
            servicio: "Consulta"
        });

        expect(actualizada.cliente).toBe("Pedro");
        expect(actualizada.hora).toBe("19:00");

    });


    test("Debe lanzar error si la reserva no existe al actualizar", () => {

        expect(() => {

            reservaService.actualizarReserva(999, {
                cliente: "Pedro",
                fecha: "2026-08-20",
                hora: "19:00",
                servicio: "Consulta"
            });

        }).toThrow("Reserva no encontrada.");
    })


    test("Debe cancelar correctamente una reserva", () => {

        const reserva = reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        })

        const cancelada = reservaService.cancelarReserva(reserva.id);
        expect(reserva.estado).toBe("CANCELADA");
    })

    test("Debe lanzar error si la reserva no existe al cancelar", () => {

        expect(() => {

            reservaService.cancelarReserva(999)

        }).toThrow("Reserva no encontrada.");
    })

    test("La reserva ya estaba cancelada", () => {

        const reserva = reservaService.crearReserva({
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        })

        const cancelada = reservaService.cancelarReserva(reserva.id);
        expect(reserva.estado).toBe("CANCELADA");


        expect(() => {
            const cancelada = reservaService.cancelarReserva(reserva.id);
            expect(reserva.estado).toBe("CANCELADA");
        }).toThrow("La reserva ya estaba cancelada");
    })

    test("Debe devolver null al cancelar una reserva inexistente", () => {

        const resultado = reservaRepository.cancelar(999);

        expect(resultado).toBeNull();

    });

    test("Debe devolver null al actualizar una reserva inexistente", () => {

        const resultado = reservaRepository.actualizar(999, {
            cliente: "Juan",
            fecha: "2026-08-20",
            hora: "18:00",
            servicio: "Consulta"
        });

        expect(resultado).toBeNull();

    });



});
import axios from "axios";

const API_URL = "http://localhost:3000";

export const obtenerReservas = async () => {
    const respuesta = await axios.get(`${API_URL}/reservas`);
    return respuesta.data;
};

export const crearReserva = async (reserva) => {
    const respuesta = await axios.post(`${API_URL}/reservas`, reserva);
    return respuesta.data;
};

export const buscarReserva = async (id) => {
    const respuesta = await axios.get(`${API_URL}/reservas/${id}`);
    return respuesta.data;
};

export const actualizarReserva = async (id, reserva) => {
    const respuesta = await axios.put(`${API_URL}/reservas/${id}`, reserva);
    return respuesta.data;
};

export const cancelarReserva = async (id) => {
    const respuesta = await axios.delete(`${API_URL}/reservas/${id}`);
    return respuesta.data;
};
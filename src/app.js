const express = require("express");
const cors = require("cors");

const reservaRoutes = require("./routes/ReservaRoutes");

const app = express();

// Habilitar CORS explícito evitando el comodín global problemático
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sistema de Reservas funcionando correctamente 🚀");
});

// Registrar las rutas
app.use(reservaRoutes);

module.exports = app;
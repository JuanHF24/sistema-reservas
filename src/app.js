const express = require("express");
const cors = require("cors");

const reservaRoutes = require("./routes/ReservaRoutes");

const app = express();

// Middleware de CORS permitido globalmente
app.use(cors());

// Manejar explícitamente las peticiones Preflight (OPTIONS)
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sistema de Reservas funcionando correctamente 🚀");
});

// Registrar las rutas
app.use(reservaRoutes);

module.exports = app;
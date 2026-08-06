const express = require("express");

const reservaRoutes = require("./routes/ReservaRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Sistema de Reservas funcionando correctamente 🚀");
});

// Registrar las rutas
app.use(reservaRoutes);

module.exports = app;
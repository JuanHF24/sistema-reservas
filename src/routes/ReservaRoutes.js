const express = require("express");
const router = express.Router();

const reservaController = require("../controllers/ReservaController");

router.post("/reservas", (req, res) => reservaController.crear(req, res));

router.get("/reservas", (req, res) => reservaController.listar(req, res));

router.get("/reservas/:id", (req, res) => reservaController.buscar(req, res));

router.put("/reservas/:id", (req, res) => reservaController.actualizar(req, res));

router.delete("/reservas/:id", (req, res) => reservaController.cancelar(req, res));

module.exports = router;
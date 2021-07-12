const express = require("express");

const app = express();
const morgan = require("morgan");

// Agregamos lo que requerimos
const {
  listarVacunas,
  listarVacunasCentro,
  anyadirVacunaCentro,
  getDosisVacuna
} = require("../db/controladores/vacunas");

const Vacuna = require("../db/modelos/Vacuna");

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware - morgan - ver lo que llega al servidor

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes para las operaciones con vacunas

app.get("/listarVacunas", (req, res) => {
  res.send("Se esta listando las vacunas");
});

// Starting the server
// Configuracion package json : "dev": "nodemon cli/init.js"

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.set("port")}`);
});

// Error de ruta no encontrada
app.use((req, res, next) => {
  res.status(404).send({ error: true, message: "Recurso no encontrado" });
});

// Manejador de errores
app.use((err, req, res, next) => {
  const codigo = err.codigo || 500;
  const mensajeError = err.codigo ? err.message : "Ha habido un pete general";
  res.status(codigo).send({ error: true, mensaje: mensajeError });
});

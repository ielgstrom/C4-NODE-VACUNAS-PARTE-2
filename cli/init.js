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

app.get("/vacunacion/centros/ciudad/:idCiudad", (req, res) => {
  res.send("Devuelve un array con los centros de vacunación de la ciudad");
});

app.get("/vacunacion/centros/centro/:idCentro", (req, res) => {
  res.send("Devuelve la información sobre un centro");
});

app.get("/vacunacion/vacunados/ciudad/:idCiudad ", (req, res) => {
  res.send("Devuelve un array con las personas que se han vacunado en una ciudad");
});

app.get("/vacunacion/vacunados/centro/:idCentro", (req, res) => {
  res.send("Devuelve un array con las personas que se han vacunado en un centro");
});

app.get("/vacunacion/vacunados/persona/:dni", (req, res) => {
  res.send("Devuelve la información de una persona vacunada a partir de su DNI");
});

app.post("/vacunacion/vacunados/persona", (req, res) => {
  res.send("Para crear una persona vacunada");
});

app.put("/vacunacion/vacunados/persona/:idPersona", (req, res) => {
  res.send("Para modificar una persona vacunada");
});

app.delete("/vacunacion/vacunados/persona/:idPersona", (req, res) => {
  res.send("Para borrar una persona vacunada");
});

app.get("/vacunacion/vacunas/ciudad/:idCiudad", (req, res) => {
  res.send("Devuelve cuántas dosis de cada vacuna se han administrado en una ciudad");
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

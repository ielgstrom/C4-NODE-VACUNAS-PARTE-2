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


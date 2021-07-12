require("dotenv").config();
const debug = require("debug")("vacunasApp:db:conexion");
const chalk = require("chalk");
const mongoose = require("mongoose");
const { personasVacunadasEnCiudad } = require("./controladores/personas");
const { dosisEnCiudad } = require("./controladores/ciudades");

const conectarBD = (hazAlgo) => {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        debug(chalk.red("No se ha podido conectar a la base de datos"));
        debug(chalk.red(err.message));
        return;
      }
      debug(chalk.yellow("Conectado a la base de datos"));
      // hazAlgo();
      dosisEnCiudad("60e8277c500167717ca730bb");
    }
  );
};

module.exports = conectarBD;

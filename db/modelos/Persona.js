const { Schema, model } = require("mongoose");

const PersonaSchema = new Schema({
  dni: {
    type: String,
    maxLength: 9,
    unique: true,
    required: true,
  },
  puntoVacunacion: {
    type: Schema.Types.ObjectId,
    ref: "CentroVacunacion",
    required: true,
  },
  vacuna: {
    type: Schema.Types.ObjectId,
    ref: "Vacuna",
    required: true,
  },
  dosis: [Date],
});

const Persona = model("Persona", PersonaSchema, "Persona");

module.exports = Persona;

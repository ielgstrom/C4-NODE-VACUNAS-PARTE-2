const Persona = require("../modelos/Persona");
const Ciudad = require("../modelos/Ciudad");

const crearPersonaVacunada = async (
  dni,
  idCentro,
  idVacuna,
  primeraDosis,
  segundaDosis
) => {
  const persona = await Persona.create({
    dni,
    centroVacunacion: idCentro,
    vacuna: idVacuna,
  });
  if (primeraDosis) {
    persona.dosis.push(primeraDosis);
  }
  if (segundaDosis) {
    persona.dosis.push(segundaDosis);
  }
  persona.save();
  return persona;
};

const personasVacunadasEnCiudad = async (idCiudad) => {
  const ciudad = await Ciudad.findById(idCiudad).populate("puntosVacunacion");

  const idPuntosVacunacion = ciudad.puntosVacunacion.map(
    (puntoVacunacionArr) => puntoVacunacionArr._id
  );

  console.log(idPuntosVacunacion);
  const personas = await Persona.find({
    puntoVacunacion: { $in: idPuntosVacunacion },
  });

  console.log(personas);
  return personas;
};
module.exports = {
  crearPersonaVacunada,
  personasVacunadasEnCiudad,
};

const Ciudad = require("../modelos/Ciudad");
const { personasVacunadasEnCiudad } = require("./personas");
const { listarVacunas } = require("./vacunas");

const dosisEnCiudad = async (idCiudad) => {
  const personas = await personasVacunadasEnCiudad(idCiudad);
  const vacunas = await listarVacunas();

  const vacunasFormateadas = vacunas.map((vacuna) => {
    const vacunaToReturn = {};

    vacunaToReturn.nombre = vacuna.nombre;
    vacunaToReturn.dosisAdministradas = personas.reduce(
      (acumulador, valorActual) => {
        if (valorActual.vacuna.equals(vacuna._id)) {
          return acumulador + valorActual.dosis.length;
        }
        return acumulador;
      },
      0
    );
    return vacunaToReturn;
  });

  return vacunasFormateadas;
};

module.exports = { dosisEnCiudad };

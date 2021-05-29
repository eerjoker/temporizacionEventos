import { RecurrenceRule } from "node-schedule"
import { crearNombreEvento } from "./NombreEvento.js"
import { crearErrorDatosInvalidos } from "../errors/ErrorDatosInvalidos.js"

/**
 * Crea el modelo de un evento a ejecutar según la regla asignada.
 * @function crearEvento
 * @param {Object} datos - Las propiedades del evento.
 * @param {string} datos.nombreEvento - El nombre identificador del evento.
 * @param {RecurrenceRule} datos.regla - La regla que determina los momentos de ejecución del evento.
 * @param {function} datos.accion - La acción que se realizará al ejecutar el evento.
*/
function crearEvento(datos) {
  const evento = {}

  if(!datos.regla) {
    throw crearErrorDatosInvalidos('Falta la regla de tiempo del evento.')
  } else if(!(datos.regla instanceof RecurrenceRule)) {
    throw crearErrorDatosInvalidos('La regla del evento no es válida.')
  } else {
    evento.regla = datos.regla
  }

  if(!datos.accion) {
    throw crearErrorDatosInvalidos('Falta la acción del evento.')
  } else if(typeof datos.accion !== 'function') {
    throw crearErrorDatosInvalidos('La acción del evento no es una función válida.')
  } else {
    evento.accion = datos.accion
  }

  evento.nombre = crearNombreEvento(datos.nombreEvento)

  return evento
}

export { crearEvento }
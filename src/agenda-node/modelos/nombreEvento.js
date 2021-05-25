import { crearErrorDatosInvalidos } from "../errors/ErrorDatosInvalidos.js"

/**
 * Crea el modelo de un nombre para asignarle a un evento.
 * @function crearNombreEvento
 * @param {string} datoNombre - El nombre identificador de un evento.
*/
function crearNombreEvento(datoNombre) {

  // Valida que haya un nombre
  if(!datoNombre) {
    throw crearErrorDatosInvalidos('El evento necesita un nombre.')
  }

  // Valida que no haya espacios vacíos
  if(/\s/.test(datoNombre)) {
    throw crearErrorDatosInvalidos('El nombre del evento no puede tener espacios.')
  }

  // Valida que solo haya caracteres no alfanuméricos
  if(/\W/.test(datoNombre)) {
    throw crearErrorDatosInvalidos('El nombre debe estar compuesto solo por caracteres alfanuméricos.')
  }

  return datoNombre
}

export { crearNombreEvento }
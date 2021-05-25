import { crearErrorDatosInvalidos } from '../errors/ErrorDatosInvalidos.js'

/**
 * Crea el modelo de una regla de tiempo. Las reglas determinan el momento en que se va a ejecutar el evento al que se asigne cada una.
 * @function crearRegla
 * @param {Object} datos - Los valores de cada unidad de tiempo. Son opcionales.
 * @param {number} datos.segundo - El segundo en el cual se ejecutaría el evento.
 * @param {number} datos.minuto - El minuto en el cual se ejecutaría el evento.
 * @param {number} datos.hora - La hora en la cual se ejecutaría el evento.
 * @param {number} datos.dia - El dia en el cual se ejecutaría el evento.
 * @param {number} datos.mes - El mes en el cual se ejecutaría el evento.
 * @param {number} datos.anio - El año en el cual se ejecutaría el evento.
 * @param {*} valorSeleccionCompleta - El valor asignado para seleccionar todos los valores de la unidad de tiempo correspondiente.
*/
function crearRegla(datos, valorSeleccionCompleta) {
  const regla = {}

  if(!esUnidadTiempoValida(datos.segundo)) {
    throw crearErrorDatosInvalidos('Los segundos deben ser un número')
  } else {
    regla.segundo = datos.segundo
  }

  if(!esUnidadTiempoValida(datos.minuto)) {
    throw crearErrorDatosInvalidos('Los minutos deben ser un número')
  } else {
    regla.minuto = datos.minuto
  }

  if(!esUnidadTiempoValida(datos.hora)) {
    throw crearErrorDatosInvalidos('Las horas deben ser un número')
  } else {
    regla.hora = datos.hora
  }

  if(!esUnidadTiempoValida(datos.dia)) {
    throw crearErrorDatosInvalidos('Los dias deben ser un número')
  } else {
    regla.dia = datos.dia
  }

  if(!esUnidadTiempoValida(datos.mes)) {
    throw crearErrorDatosInvalidos('Los meses deben ser un número')
  } else {
    regla.mes = datos.mes
  }

  if(!esUnidadTiempoValida(datos.anio)) {
    throw crearErrorDatosInvalidos('Los años deben ser un número')
  } else {
    regla.anio = datos.anio
  }

  return regla

  function esUnidadTiempoValida(dato) {
    return typeof dato === 'undefined' || dato === valorSeleccionCompleta || !isNaN(Number(dato))
  }
}

export { crearRegla }
import { crearAdministradorReglas } from './administradores/AdministradorReglas.js'
import { crearAdministradorEventos } from './administradores/AdministradorEventos.js'

/**
 * Crea una agenda que guarda y ejecuta eventos en tiempo real según
 * la hora, minuto y/o segundo seleccionados.
 * @function crearAgenda
 * @param {string} timezone - La zona horaria usada para agendar las fechas y horas. Ejemplo: America/Argentina/Buenos_Aires.
 * Una lista de valores válidos se puede encontrar en https://en.wikipedia.org/wiki/List_of_tz_database_time_zones,
 * columna TZ database name.
*/
function crearAgenda(timezone) {
  const administradorReglas = crearAdministradorReglas(timezone)
  const administradorEventos = crearAdministradorEventos()
  
  function agendar(nombreEvento, regla, accion) {
    administradorEventos.agendarEvento(nombreEvento, regla, accion)
    administradorReglas.agregarRegla(nombreEvento, regla)
  }

  function modificar(nombreEvento, regla) {
    administradorReglas.agregarRegla(nombreEvento, regla)
    administradorEventos.modificarEvento(nombreEvento, regla)
  }

  return {
    /**
     * @function seleccionarTodos - Devuelve un valor para usar como parámetro de medida de tiempo en las otras funciones.
     * @returns - El valor para usar cuando son deseados todos los valores de la medida de tiempo correspondiente.
     * Ej.: Si se usa en un método de hora, el evento se repetirá todas las horas.
     */
    seleccionarTodos: () => {
      return administradorReglas.getSeleccionCompleta()
    },
    /**
     * Agenda un nuevo evento en la fecha y el horario indicados.
     * @function agendarFechaHorario
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} segundo - Segundo en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {number} minuto - Minuto en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {number} hora - Hora en la cual se ejecutará el evento. Debe ser un valor entre 0 y 23.
     * @param {number} dia - Dia en el cual se ejecutará el evento. Debe ser un valor entre 1 y 31.
     * @param {number} mes - Mes en el cual se ejecutará el evento. Debe ser un valor entre 0 y 11.
     * @param {number} anio - Año en el cual se ejecutará el evento. Debe ser un valor de año válido.
     * @param {function} accion - Lo que se ejecuta.
     */
    agendarFechaHorario: (nombreEvento, segundo, minuto, hora, dia, mes, anio, accion) => {
      const regla = administradorReglas.construirRegla({segundo, minuto, hora, dia, mes, anio}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en la fecha indicada.
     * No se recomienda usar para eventos a ejecutar el mismo día que se agendan. En esos casos, usar agendarFechaHorario o agendarDiaHora.
     * @function agendarFecha
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} dia - Dia en el cual se ejecutará el evento. Debe ser un valor entre 1 y 31.
     * @param {number} mes - Mes en el cual se ejecutará el evento. Debe ser un valor entre 0 y 11.
     * @param {number} anio - Año en el cual se ejecutará el evento. Debe ser un valor de año válido.
     * @param {function} accion - Lo que se ejecuta.
     */
    agendarFecha: (nombreEvento, dia, mes, anio, accion) => {
      const regla = administradorReglas.construirRegla({dia, mes, anio}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el horario indicado.
     * @function agendarHorario
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} segundo - Segundo en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {number} minuto - Minuto en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {number} hora - Hora en la cual se ejecutará el evento. Debe ser un valor entre 0 y 23.
     * @param {function} accion - Lo que se ejecuta.
     */
    agendarHorario: (nombreEvento, segundo, minuto, hora, accion) => {
      const regla = administradorReglas.construirRegla({segundo, minuto, hora}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el dia y la hora indicados.
     * @function agendarDiaHora
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} hora - Hora en la cual se ejecutará el evento. Debe ser un valor entre 0 y 23.
     * @param {number} dia - Dia en el cual se ejecutará el evento. Debe ser un valor entre 1 y 31.
     * @param {function} accion - Lo que se ejecuta.
     */
    agendarDiaHora: (nombreEvento, hora, dia, accion) => {
      const regla = administradorReglas.construirRegla({hora, dia}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el segundo indicado.
     * @function agendarPorSegundo
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} segundo - Segundo en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {function} accion - Lo que se ejecuta cada segundo.
    */
    agendarPorSegundo: (nombreEvento, segundo, accion) => {
      const regla = administradorReglas.construirRegla({segundo}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el minuto indicado.
     * @function agendarPorMinuto
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} minuto - Minuto en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {function} accion - Lo que se ejecuta cada minuto.
    */
    agendarPorMinuto: (nombreEvento, minuto, accion) => {
      const regla = administradorReglas.construirRegla({minuto}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en la hora indicada.
     * @function agendarPorHora
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} hora - Hora en la cual se ejecutará el evento. Debe ser un valor entre 0 y 23.
     * @param {function} accion - Lo que se ejecuta cada hora.
    */
    agendarPorHora: (nombreEvento, hora, accion) => {
      const regla = administradorReglas.construirRegla({hora}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el día indicado.
     * @function agendarPorDia
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} dia - Dia en el cual se ejecutará el evento. Debe ser un valor entre 1 y 31.
     * @param {function} accion - Lo que se ejecuta cada día.
    */
     agendarPorDia: (nombreEvento, dia, accion) => {
      const regla = administradorReglas.construirRegla({dia}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el mes indicado.
     * @function agendarPorMes
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} mes - Mes en el cual se ejecutará el evento. Debe ser un valor entre 0 y 11.
     * @param {function} accion - Lo que se ejecuta cada mes.
    */
     agendarPorMes: (nombreEvento, mes, accion) => {
      const regla = administradorReglas.construirRegla({mes}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Agenda un nuevo evento en el año indicado.
     * @function agendarPorAnio
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} anio - Año en el cual se ejecutará el evento. Debe ser un valor de año válido.
     * @param {function} accion - Lo que se ejecuta cada año.
    */
     agendarPorAnio: (nombreEvento, anio, accion) => {
      const regla = administradorReglas.construirRegla({anio}, nombreEvento)
      agendar(nombreEvento, regla, accion)
    },
    /**
     * Cancela el evento para que no se vuelva a ejecutar.
     * @function cancelar
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
    */
    cancelar: (nombreEvento) => {
      administradorEventos.cancelarEvento(nombreEvento)
    },
    /**
     * Reactiva el evento cancelado, restableciendo su momento de ejecución previo.
     * @function reactivar
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
    */
    reactivar: (nombreEvento) => {
      const regla = administradorReglas.buscarRegla(nombreEvento)
      administradorEventos.reactivarEvento(nombreEvento, regla)
    },
    /**
     * Modifica el segundo de un evento existente.
     * @function modificarSegundo
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} segundo - Segundo en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
     * @param {boolean} mantieneConfiguracion - Mantiene la configuración anterior o la revierte.
     * Por defecto, 
    */
    modificarSegundo: (nombreEvento, segundo) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({segundo}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    },
    /**
     * Modifica el minuto de un evento existente.
     * @function modificarMinuto
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} minuto - Minuto en el cual se ejecutará el evento. Debe ser un valor entre 0 y 59.
    */
     modificarMinuto: (nombreEvento, minuto) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({minuto}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    },
    /**
     * Modifica la hora de un evento existente.
     * @function modificarHora
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} hora - Hora en la cual se ejecutará el evento. Debe ser un valor entre 0 y 23.
    */
    modificarHora: (nombreEvento, hora) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({hora}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    },
    /**
     * Modifica el dia de un evento existente.
     * @function modificarDia
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} dia - Dia en el cual se ejecutará el evento. Debe ser un valor entre 1 y 31.
    */
     modificarDia: (nombreEvento, dia) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({dia}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    },
    /**
     * Modifica el mes de un evento existente.
     * @function modificarMes
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} mes - Mes en el cual se ejecutará el evento. Debe ser un valor entre 0 y 11.
    */
     modificarMes: (nombreEvento, mes) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({mes}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    },
    /**
     * Modifica el año de un evento existente.
     * @function modificarAnio
     * @param {string} nombreEvento - El identificador del evento. Debe ser un texto válido como nombre de variable.
     * @param {number} anio - Año en el cual se ejecutará el evento. Debe ser un valor de año válido.
    */
     modificarAnio: (nombreEvento, anio) => {
      let regla = administradorReglas.buscarRegla(nombreEvento)
      regla = administradorReglas.construirRegla({anio}, nombreEvento, regla)
      modificar(nombreEvento, regla)
    }
  }
}

export { crearAgenda }
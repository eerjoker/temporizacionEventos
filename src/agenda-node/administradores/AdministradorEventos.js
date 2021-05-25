import schedule from 'node-schedule'
import { crearEvento } from '../modelos/Evento.js'
import { crearErrorEventoNulo } from '../errors/ErrorEventoNulo.js'

/**
 * Crea un administrador encargado de agendar, modificar, cancelar y reactivar eventos.
 * @function crearAdministradorEventos
*/
function crearAdministradorEventos() {
  const eventosActivos = {}
  const eventosCancelados = {}

  function validarEvento(evento, mensaje) {
    if(typeof evento === "undefined" || evento == null) {
      throw crearErrorEventoNulo('Error al validar. ' + mensaje)
    }
  }

  function buscarEvento(nombreEvento, eventos) {
    const evento = eventos[nombreEvento]
    validarEvento(evento, 'El evento buscado no existe.')
    return evento
  }

  // Se le asigna un nombre para poder acceder a las funciones desde dentro del objeto
  const administradorEventos = {
    agendarEvento: (nombreEvento, regla, accion) => {
      const evento = crearEvento({ nombreEvento, regla, accion })
      const eventoAgendado = schedule.scheduleJob(evento.nombre, evento.regla, evento.accion)
      validarEvento(eventoAgendado, 'No se pudo agendar el evento. Los valores enviados para agendar no son válidos.')
      eventosActivos[nombreEvento] = eventoAgendado
    },  
    modificarEvento: (nombreEvento, regla) => {
      try {
        const evento = buscarEvento(nombreEvento, eventosActivos)
        evento.reschedule(regla)
      } catch(error) {
        if(error.type == 'ERROR_EVENTO_NULO') {
          administradorEventos.reactivarEvento(nombreEvento, regla)
        } else {
          throw error
        }
      }
    },
    cancelarEvento: (nombreEvento) => {
      const evento = buscarEvento(nombreEvento, eventosActivos)
      evento.cancel()
      eventosCancelados[nombreEvento] = evento
      delete eventosActivos[nombreEvento]
    },
    reactivarEvento: (nombreEvento, regla) => {
      const evento = buscarEvento(nombreEvento, eventosCancelados)
      evento.schedule(regla)
      eventosActivos[nombreEvento] = evento
      delete eventosCancelados[nombreEvento]
    }
  }

  return administradorEventos
}

export { crearAdministradorEventos }
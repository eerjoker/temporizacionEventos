import { RecurrenceRule } from 'node-schedule'
import { crearRegla } from '../modelos/Regla.js'

/**
 * Crea un administrador encargado de guardar y construir reglas para los eventos.
 * @function crearAdministradorReglas
 * @param {string} [timezone=null] - La zona horaria usada para agendar las fechas y horas.
 * Una lista de valores válidos se puede encontrar en https://en.wikipedia.org/wiki/List_of_tz_database_time_zones,
 * columna TZ database name.
*/
function crearAdministradorReglas(timezone = null) {
  const seleccionCompleta = null
  const reglas = {}
  const seleccionesCompletasRealizadas = {}

  function registrarSeleccionesCompletas(valores, nombreEvento) {
    for(const valor in valores) {
      if(valores[valor] == seleccionCompleta) {
        if(Array.isArray(seleccionesCompletasRealizadas[nombreEvento])) {
          seleccionesCompletasRealizadas[nombreEvento].push(valor)
        } else {
          seleccionesCompletasRealizadas[nombreEvento] = [valor]
        }
      }
    }
  }

  function construirReglaSegundo(nuevaRegla, regla, nombreEvento) {
    // second es opcional para node-schedule y puede quedar sin valor
    if(tieneValor({ segundo: nuevaRegla.segundo }, nombreEvento)) {
      regla.second = nuevaRegla.segundo
    }
  }

  function construirReglaMinuto(nuevaRegla, regla, nombreEvento) {
    const valoresMayores = {
      hour: regla.hour,
      date: regla.date,
      month: regla.month,
      year: regla.year,
      hora: nuevaRegla.hora,
      dia: nuevaRegla.dia,
      mes: nuevaRegla.mes,
      anio: nuevaRegla.anio
    }
    const valoresMenores = {
      second: regla.second,
      segundo: nuevaRegla.segundo
    }
    
    if(tieneValor({ minuto: nuevaRegla.minuto }, nombreEvento)) {
      regla.minute = nuevaRegla.minuto
    } else if(!tieneValor({ minute: regla.minute }, nombreEvento)) {
      regla.minute = valorSegunOtrosValores(regla.minute, valoresMayores, valoresMenores, nombreEvento)
    }
  }

  function construirReglaHora(nuevaRegla, regla, nombreEvento) {
    const valoresMayores = {
      date: regla.date,
      month: regla.month,
      year: regla.year,
      dia: nuevaRegla.dia,
      mes: nuevaRegla.mes,
      anio: nuevaRegla.anio
    }
    const valoresMenores = {
      second: regla.second,
      minute: regla.minute,
      segundo: nuevaRegla.segundo,
      minuto: nuevaRegla.minuto
    }
    
    if(tieneValor({ hora: nuevaRegla.hora }, nombreEvento)) {
      regla.hour = nuevaRegla.hora
    } else if(!tieneValor({ hour: regla.hour }, nombreEvento)) {
      regla.hour = valorSegunOtrosValores(regla.hour, valoresMayores, valoresMenores, nombreEvento)
    }
  }

  function construirReglaDia(nuevaRegla, regla, nombreEvento) {
    const valoresMayores = {
      month: regla.month,
      year: regla.year,
      mes: nuevaRegla.mes,
      anio: nuevaRegla.anio
    }
    const valoresMenores = {
      second: regla.second,
      minute: regla.minute,
      hour: regla.hour,
      segundo: nuevaRegla.segundo,
      minuto: nuevaRegla.minuto,
      hora: nuevaRegla.hora
    }

    if(tieneValor({ dia: nuevaRegla.dia }, nombreEvento)) {
      regla.date = nuevaRegla.dia
    } else if(!tieneValor({ date: regla.date }, nombreEvento)) {
      regla.date = valorSegunOtrosValores(regla.date, valoresMayores, valoresMenores, nombreEvento)
    }
  }

  function construirReglaMes(nuevaRegla, regla, nombreEvento) {
    const valoresMayores = {
      year: regla.year,
      anio: nuevaRegla.anio
    }
    const valoresMenores = {
      second: regla.second,
      minute: regla.minute,
      hour: regla.hour,
      date: regla.date,
      segundo: nuevaRegla.segundo,
      minuto: nuevaRegla.minuto,
      hora: nuevaRegla.hora,
      dia: nuevaRegla.dia
    }

    if(tieneValor({ mes: nuevaRegla.mes }, nombreEvento)) {
      regla.month = nuevaRegla.mes
    } else if(!tieneValor({ month: regla.month }, nombreEvento)) {
      regla.month = valorSegunOtrosValores(regla.month, valoresMayores, valoresMenores, nombreEvento)
    }
  }

  function construirReglaAnio(nuevaRegla, regla, nombreEvento) {
    const valoresMayores = {}
    const valoresMenores = {
      second: regla.second,
      minute: regla.minute,
      hour: regla.hour,
      date: regla.date,
      month: regla.month,
      segundo: nuevaRegla.segundo,
      minuto: nuevaRegla.minuto,
      hora: nuevaRegla.hora,
      dia: nuevaRegla.dia,
      mes: nuevaRegla.mes
    }

    if(tieneValor({ anio: nuevaRegla.anio }, nombreEvento)) {
      regla.year = nuevaRegla.anio
    } else if(!tieneValor({ year: regla.year }, nombreEvento)) {
      regla.year = valorSegunOtrosValores(regla.year, valoresMayores, valoresMenores, nombreEvento)
    }
  }

  function valorSegunOtrosValores(valorOriginal, valoresMayores, valoresMenores, nombreEvento) {
    // tiene que quedar en 0 o en seleccionCompleta dependiendo de los otros valores
    if(tieneValor(valoresMayores, nombreEvento)) {
      return 0
    } else if(tieneValor(valoresMenores, nombreEvento)) {
      return seleccionCompleta
    } else {
      return valorOriginal
    }
  }

  function tieneValor(valores, nombreEvento) {
    for(const valor in valores) {
      if(valores[valor] != null) {
        return true
      }
      const listaSelecciones = seleccionesCompletasRealizadas[nombreEvento]
      if(Array.isArray(listaSelecciones) && listaSelecciones.includes(valor)) {
        return true
      }
    }
    return false
  }

  return {
    getSeleccionCompleta: () => {
      return seleccionCompleta
    },
    construirRegla: (valoresTiempo, nombreEvento, recurrenceRule = new RecurrenceRule()) => {
      registrarSeleccionesCompletas(valoresTiempo, nombreEvento)

      const nuevaRegla = crearRegla(valoresTiempo)
      recurrenceRule.tz = recurrenceRule.tz != null ? recurrenceRule.tz : timezone
      construirReglaSegundo(nuevaRegla, recurrenceRule, nombreEvento)
      construirReglaMinuto(nuevaRegla, recurrenceRule, nombreEvento)
      construirReglaHora(nuevaRegla, recurrenceRule, nombreEvento)
      construirReglaDia(nuevaRegla, recurrenceRule, nombreEvento)
      construirReglaMes(nuevaRegla, recurrenceRule, nombreEvento)
      construirReglaAnio(nuevaRegla, recurrenceRule, nombreEvento)
  
      return recurrenceRule
    },
    buscarRegla: (nombreEvento) => {
      return reglas[nombreEvento]
    },
    agregarRegla: (nombreEvento, regla) => {
      reglas[nombreEvento] = regla
    }
  }
}

export { crearAdministradorReglas }
import { crearAgenda } from './agenda-node/Agenda.js'

// Va probando de a uno
testTemporizacion()
setTimeout(() => testAgendarHorario(), 185000)
setTimeout(() => testAgendarFecha(), 245000)
setTimeout(() => testAgendarDiaHora(), 305000)
setTimeout(() => testAgendarFechaHorario(), 365000)


function testTemporizacion() {
  const agenda = crearAgenda('America/Argentina/Buenos_Aires')

  console.log('\n--- Prueba Temporización ---')
  console.log('Esta prueba dura tres minutos.\n')

  let i = 0
  agenda.agendarPorSegundo('control', agenda.seleccionarTodos(), () => {
    console.log('Control: ' + i)
    i++

    // Al segundo 60 se cancela el evento3
    cancelarCuando(i, 60, 'evento3')
    // Al segundo 120 se reactiva el evento3
    reactivarCuando(i, 120, 'evento3', 50)
    // A la vez, se modifica el evento1 para que se ejecute dos segundos despues del evento2
    modificarSegundoCuando(i, 120, 'evento1', 32)
    cancelarCuando(i, 180, 'evento1')
    cancelarCuando(i, 180, 'evento2')
    cancelarCuando(i, 180, 'evento3')
    cancelarCuando(i, 185, 'control')
  })
  
  agenda.agendarPorSegundo('evento1', 10, () => {console.log('Soy el primer evento')})
  agenda.agendarPorSegundo('evento2', 30, () => {console.log('Soy el segundo evento')})
  agenda.agendarPorSegundo('evento3', 50, () => {console.log('Soy el tercer evento')})

  function cancelarCuando(actual, final, nombreEvento) {
    if(actual == final) {
      agenda.cancelar(nombreEvento)
      console.log("Se canceló " + nombreEvento);
    }
  }
  
  function reactivarCuando(actual, final, nombreEvento) {
    if(actual == final) {
      agenda.reactivar(nombreEvento)
      console.log("Se reactivó " + nombreEvento);
    }
  }
  
  function modificarSegundoCuando(actual, final, nombreEvento, nuevoSegundo) {
    if(actual == final) {
      agenda.modificarSegundo(nombreEvento, nuevoSegundo)
      console.log("Se cambió " + nombreEvento);
    }
  }
}

function testAgendarHorario() {
  const agenda = crearAgenda('America/Argentina/Buenos_Aires')
  
  console.log('\n--- Prueba Agendar Horario ---')
  console.log('Esta prueba dura un minuto.\n')

  const fecha = new Date()
  console.log(`Durante las ${ fecha.getHours() } y ${ fecha.getMinutes() + 1 } minutos se ejecutarán los dos eventos.`)
  console.log(`Uno a los 0 segundos y otro a los ${ fecha.getSeconds() } segundos.`)

  agenda.agendarPorHora('eventoHoraMinuto', fecha.getHours(),
                          () => {
                            console.log('Funciona agendarPorHora y modificarMinuto!!')
                          })
  agenda.modificarMinuto('eventoHoraMinuto', fecha.getMinutes() + 1)

  agenda.agendarHorario('eventoHoraMinutoSegundo', fecha.getSeconds(), fecha.getMinutes() + 1, fecha.getHours() + 1, 
                          () => {
                            console.log('Funciona agendarHorario y modificarHora!!')
                          })
  agenda.modificarHora('eventoHoraMinutoSegundo', fecha.getHours())
}

function testAgendarFecha() {
  const agenda = crearAgenda('America/Argentina/Buenos_Aires')

  console.log('\n--- Prueba Agendar Fecha ---')
  console.log('Esta prueba dura un minuto.\n')

  const fecha = new Date()
  console.log(`Durante las ${ fecha.getHours() } y ${ fecha.getMinutes() + 1 } minutos se ejecutará el evento.`)

  agenda.agendarFecha('eventoFecha', fecha.getDate() + 1, fecha.getMonth(), fecha.getFullYear(),
                        () => {
                          console.log('Funciona agendarFecha, modificarDia, modificarHora y modificarMinuto!!')
                        })
  agenda.modificarHora('eventoFecha', fecha.getHours())
  agenda.modificarMinuto('eventoFecha', fecha.getMinutes() + 1)
  agenda.modificarDia('eventoFecha', fecha.getDate())
}

function testAgendarDiaHora() {
  const agenda = crearAgenda('America/Argentina/Buenos_Aires')

  console.log('\n--- Prueba Agendar Dia Hora ---')
  console.log('Esta prueba dura un minuto.\n')
  
  const fecha = new Date()
  console.log(`Durante las ${ fecha.getHours() } y ${ fecha.getMinutes() + 1 } minutos se ejecutará el evento.`)

  agenda.agendarDiaHora('eventoDiaHora', fecha.getHours(), fecha.getDate(),
                        () => {
                          console.log('Funciona agendarDiaHora y modificarMinuto!!')
                        })
  agenda.modificarMinuto('eventoDiaHora', fecha.getMinutes() + 1)
}

function testAgendarFechaHorario() {
  const agenda = crearAgenda('America/Argentina/Buenos_Aires')

  console.log('\n--- Prueba Agendar Fecha Horario ---')
  console.log('Esta prueba dura un minuto.\n')

  const fecha = new Date()
  console.log(`Durante las ${ fecha.getHours() } y ${ fecha.getMinutes() + 1 } minutos se ejecutará el evento.`)

  agenda.agendarFechaHorario('eventoFechaHora', fecha.getSeconds(), fecha.getMinutes() + 1, fecha.getHours(),
                              fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                              () => {
                                console.log('Funciona agendarFechaHorario!!')
                              })
  try {
    agenda.agendarFechaHorario('eventoMaloFechaHorarioAnio', fecha.getSeconds() + 30, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear() - 1,
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en el año) :(')
                                })
  } catch(err) {}
  try {
    agenda.agendarFechaHorario('eventoMaloFechaHorarioMes', fecha.getSeconds() + 30, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth() - 1, fecha.getFullYear(),
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en el mes) :(')
                                })
  } catch(err) {}
  try {
    agenda.agendarFechaHorario('eventoMaloFechaHorarioDia', fecha.getSeconds() + 30, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate() - 1, fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en el dia) :(')
                                })
  } catch(err) {}
  try {
    agenda.agendarFechaHorario('eventoMaloFechaHorarioHora', fecha.getSeconds() + 30, fecha.getMinutes(), fecha.getHours() - 1,
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en la hora) :(')
                                })
  } catch(err) {}
  try {
    agenda.agendarFechaHorario('eventoMaloFechaHorarioMinuto', fecha.getSeconds() + 30, fecha.getMinutes() - 1, fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en el minuto) :(')
                                })
  } catch(err) {}
  try{
    agenda.agendarFechaHorario('eventoMaloFechaHorarioSegundo', fecha.getSeconds() - 30, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  agenda.cancelar('eventoFechaHora')
                                  console.log('No funciona agendarFechaHorario (error en el segundo) :(')
                                })
  } catch(err) {}
  try {
    agenda.agendarFechaHorario('eventoMaloAnio', fecha.getSeconds() + 40, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  console.log('No funciona modificarAnio :(')
                                })
    agenda.modificarAnio('eventoMaloAnio', fecha.getFullYear() - 1)
  } catch(err) {}
  try{
    agenda.agendarFechaHorario('eventoMaloMes', fecha.getSeconds() + 40, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  console.log('No funciona modificarMes :(')
                                })
    agenda.modificarAnio('eventoMaloMes', fecha.getMonth() - 1)
  } catch(err) {}
  try{
    agenda.agendarFechaHorario('eventoMaloDia', fecha.getSeconds() + 40, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  console.log('No funciona modificarDia :(')
                                })
    agenda.modificarDia('eventoMaloDia', fecha.getDate() - 1)
  } catch(err) {}
  try{
    agenda.agendarFechaHorario('eventoMaloHora', fecha.getSeconds() + 40, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  console.log('No funciona modificarHora :(')
                                })
    agenda.modificarHora('eventoMaloHora', fecha.getHours() - 1)
  } catch(err) {}
  try{
    agenda.agendarFechaHorario('eventoMaloMinuto', fecha.getSeconds() + 40, fecha.getMinutes(), fecha.getHours(),
                                fecha.getDate(), fecha.getMonth(), fecha.getFullYear(),
                                () => {
                                  console.log('No funciona modificarMinuto :(')
                                })
    agenda.modificarMinuto('eventoMaloMinuto', fecha.getMinutes() - 1)
  } catch(err) {}
}
function crearErrorDatosInvalidos(mensaje) {
  const error = new Error(mensaje)
  error.type = 'ERROR_DATOS_INVALIDOS'
  return error
}

export { crearErrorDatosInvalidos }
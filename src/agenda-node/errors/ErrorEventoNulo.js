function crearErrorEventoNulo(mensaje) {
  const error = new Error(mensaje)
  error.type = 'ERROR_EVENTO_NULO'
  return error
}

export { crearErrorEventoNulo }
const nombreCompleto = value => {
  if (value === undefined || value === null || value === '') {
    return true
  }
  
  return /^(?! )(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚÜüñÑ ]+$/.test(value)
}

export {
  nombreCompleto
}

const handlerError = (error, req, res, next) => {
  if (error.name == "CastError") {
    res.status(500).json({ error: "Error de casteo", message: error.message })
  }
  else if (error.name == "ValidationError") {
    res.status(400).json({ error: "Error de validación", message: error.message })
  }
  else if (error.name == "SyntaxError") {
    res.status(400).json({ error: "Error de sintaxis", message: error.message })
  }
  else if (error.name == "ReferenceError") {
    res.status(500).json({ error: "Error de referencia", message: error.message })
  }
  else if (error.name == "TokenError") {
    res.status(401).json({ error: "Sin token", message: error.message })
  }
  else if (error.name == "JsonWebTokenError") {
    res.status(401).json({ error: "Token inválido", message: error.message })
  }
  else {
    res.status(500).json({ error: error.name, message: error.message })
  }

  console.log(error);

  next();
}
  
  module.exports = handlerError;
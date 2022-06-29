const handlerNotFound = (req, res) => {
  res.status(404).json({ error: "El recurso solicitado no existe" });
}
  
module.exports = handlerNotFound;
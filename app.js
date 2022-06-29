require('dotenv').config();
require('./database/mongo');

const express = require("express");
const app = express();
const PORT = process.env.PORT_SERVER || 3000;
const handlerError = require("./middlewares/handlerError");
const handlerNotFound = require("./middlewares/handlerNotFound");
const agentesRouter = require('./routes/agentesRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const loginRouter = require('./routes/loginRouter');

// Aplica el middleware ".json()" (viene por defecto con Express), sirve
// para inyectar en el body lo que venga en el body de la request
app.use(express.json());

app.use('/api/agentes', agentesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/login', loginRouter);

app.use(handlerError);
app.use(handlerNotFound);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


const agentesRouter = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const Agente = require('../models/Agente');

//agentesRouter.use(verifyToken);

agentesRouter.get("/", verifyToken, (req, res, next) => {
    Agente.find({})
    .then((agentes) => {
        res.json(agentes);
    })
    .catch(() => {
        next(err);
    });
});

  
agentesRouter.get("/:id", (req, res, next) => {
    const { id } = req.params;
  
    Agente.findById(id)
    .then((agente) => {
        agente ? res.json(agente) : res.status(404).send();
    })
    .catch((err) => {
        next(err);
    });
});
  

agentesRouter.post("/", (req, res, next) => {
    const { nombre, edad, radiante } = req.body;
    const nuevoAgente = new Agente({ nombre, edad, radiante });
      
    nuevoAgente.save()
    .then((agente) => {
        agente ? res.status(201).send(agente) : res.status(400).send();
    })
    .catch((err) => {
        next(err);
    });
  
});
  
  
agentesRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { nombre, edad, radiante } = req.body;
    const agenteAEditar = { nombre, edad, radiante };
  
    Agente.findByIdAndUpdate(id, agenteAEditar, { new: true })
    .then((agente) => {
        agente ? res.status(200).json(agente) : res.status(404).end();
    })
    .catch(err => {
        next(err);
    });
});
  
  
agentesRouter.delete("/:id", (req, res, next) => {
    const { id } = req.params;
  
    Agente.findByIdAndRemove(id)
    .then((agente) => {
        agente ? res.status(200).json(agente) : res.status(404).end();
    })
    .catch((err) => {
        next(err);
    });
});


module.exports = agentesRouter;
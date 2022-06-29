const usuariosRouter = require('express').Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/verifyToken');

//usuariosRouter.use(verifyToken);

usuariosRouter.get('/', async (req, res, next) => {
    try {
        const usuarios = await Usuario.find({});
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

usuariosRouter.post('/', async (req, res, next) => {
    try {
        const { usuario, clave } = req.body;
        const vueltasSalt = 10;

        if (clave.length < 6 || clave.length > 20) {
            return next( {name: "ValidationError", message: "La clave debe tener entre 6 y 20 caracteres"} );
        }

        const claveHash = await bcrypt.hash(clave, vueltasSalt);

        const usuarioNuevo = new Usuario({
            usuario,
            claveHash
        });

        const usuarioGuardado = await usuarioNuevo.save();
        res.status(201).json(usuarioGuardado);

    } catch (error) {
        next(error);
    }
})


module.exports = usuariosRouter;
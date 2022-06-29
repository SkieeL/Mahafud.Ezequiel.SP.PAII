const loginRouter = require('express').Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

loginRouter.post('/', async (req, res, next) => {
    try {
        const { usuario, clave } = req.body;

        const usuarioBuscado = await Usuario.findOne({usuario});
        console.log("USUARIO BUSCADO:");
        console.log(usuarioBuscado);
        const claveCorrecta = usuarioBuscado === null ? false : await bcrypt.compare(clave, usuarioBuscado.claveHash);

        if (!(usuarioBuscado && claveCorrecta)) {
            return next({ 
                name: "ValidationError", 
                message: "El usuario o la clave es incorrecto" 
            });
        }

        const tokenUsuario = {
            username: usuarioBuscado.usuario,
            id: usuarioBuscado._id
        }

        const token = await jwt.sign(tokenUsuario, SECRET_KEY/*, { expiresIn: '120s' } */);

        res.status(200).json({
            token,
            usuario
        });

    } catch (error) {
        next(error);
    }
});


module.exports = loginRouter;
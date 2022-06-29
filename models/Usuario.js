const { model, Schema } = require('mongoose');

const UsuarioSchema = Schema({
    usuario: {
        type: String,
        required: true,
        trim: true
    },
    claveHash: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform: (document, usuarioToJson) => {
            usuarioToJson.id = usuarioToJson._id.toString();
            delete usuarioToJson._id;
            delete usuarioToJson.__v;
            delete usuarioToJson.claveHash;
        }
    }
});

const Usuario = model('usuario', UsuarioSchema);

module.exports = Usuario; 
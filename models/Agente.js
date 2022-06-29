const { model, Schema } = require('mongoose');

const AgenteSchema = Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    edad: {
        type: Number,
        required: true
    },
    radiante: {
        type: Boolean,
        required: true
    }
},
{
    toJSON: {
        transform: (document, agenteToJson) => {
            agenteToJson.id = agenteToJson._id.toString();
            delete agenteToJson._id;
            delete agenteToJson.__v;
        }
    }
});

const Agente = model('agente', AgenteSchema);

module.exports = Agente; 
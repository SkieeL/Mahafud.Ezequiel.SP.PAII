const { connect } = require('mongoose');

// Conexión a Mongo
const conectarMongo = (uri) => {
    connect(uri)
    .then(() => {
        console.log("Conectado a la DB");
    })
    .catch((err) => {
        console.log(err);
    });
};

// Trae la variable de entorno "URI", la cual debe ser pasada como parámetro al ejecutar el script
const URI = process.env.URI_MONGO;

conectarMongo(URI);


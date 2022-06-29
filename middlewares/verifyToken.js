const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];

    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken.split(' ')[1];

        try {
            const data = await jwt.verify(req.token, process.env.SECRET_KEY);
            next();
        } catch (error) {
            next(error);
        }
    } 
    else {
        return next( { name: "TokenError", message: "No token"} );
    }
}

module.exports = verifyToken;
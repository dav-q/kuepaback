const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const algorithm = 'RS256';
const jwtFuncs = {};

process.env.expiresIn = '120m';
process.env.expiresInReset = '60m';
process.env.secret = 'KUEPA2021*';

//Firmar token de autenfificacion
jwtFuncs.signAuth = function(payload) {

    //Opciones de ingreso
    const signOptions = {
        expiresIn: process.env.expiresIn
    };
    const tokenJwt = jwt.sign(payload, process.env.secret, signOptions);
    return tokenJwt;
}

//Verificar token de autenfificacion
jwtFuncs.verifyAuth = function(token) {
    //Opciones de verificacion
    const verifyOptions = {
        expiresIn: process.env.expiresIn
    };
    return jwt.verify(token, process.env.secret, verifyOptions, (err, decoded) => {
        if (err) {
            return { status: 0, error: err };
        } else {
            return { status: 1, data: decoded };
        }
    });
}


module.exports = jwtFuncs;
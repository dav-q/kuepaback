'use strict';

const responseManagement = require('./../responseManagement');
const jwtFuncs = require('./../jwtFunctions');
const Models = require("../../models");

module.exports.authenticated = async function(req, res, next) {
    
    let token = req.headers.authorization;
    
    if (token) {
        token = token.replace('Bearer ', '');
    }

    const decoded = jwtFuncs.verifyAuth(token);
    
    if(!decoded.data){
        return responseManagement.responseJSON(res, 401, 'No autorizado');
    }

    var user = await Models.User.findByPk(decoded.data.userId || null)

    if(!user){
        return responseManagement.responseJSON(res, 401, 'No autorizado');
    }    

    if (decoded.status == 1) {
        req.tokenData = decoded.data;
        next();
    } else {
        return responseManagement.responseJSON(res, 401, 'No autorizado');
    }
}
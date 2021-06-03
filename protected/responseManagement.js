'use strict';

const response = {};

response.responseDATA = function(res, code, data) {
    return res.status(code).send(data);
}

response.responseJSON = function(res, code, message) {
    return res.status(code).send({message : message});
}

response.responseERROR = function(res, code, message) {
    return res.status(code).send(message);
}

response.responseServerERROR = function(res, code, message) {
    return res.status(code).send({message : message, code : code});
}

module.exports = response;
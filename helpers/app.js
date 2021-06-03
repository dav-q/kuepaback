var CryptoJS = require("crypto-js");

exports.arrayNames = function(path){

    let arrayName = {
        email : 'Correo electrónico',
        name : 'Nombre',
        firstName : 'Nombre',
        lastName : 'Apellido',
        password : 'Contraseña',
        typeUserId : 'Tipo de usuario',
    }

    return arrayName[path] || ''
}

exports.dateZone = function(dateString){
    var date = new Date(dateString)
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

exports.CurrentHost = function(Host){

    Host=Host.substring(0,Host.indexOf(':'))
    if (Host=="localhost") {        
        return process.env.CLIENT_URL || ''
    }else{
        return process.env.CLIENT_URL_PROD || ''
    }
}
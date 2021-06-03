const responseManagement = require('../protected/responseManagement');
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');
const Helpers = require('../helpers/app');

const authController = {};
const {
    Op,
    sequelize,
    Sequelize,
    fn
} = require("sequelize");
const Models = require("../models");

authController.register = async (req, res, next) => {

    const data = {
        firstName: req.body.FIRSTNAME,
        lastName: req.body.LASTNAME,
        email: req.body.EMAIL,
        password: req.body.PASSWORD,
        typeUserId: 2
    };

    if (data.password != null && data.password != '') {
        data.password = encrypt.generateHashPassword(data.password)
    }

    try {

        var user = await Models.User.create(data)        

        return responseManagement.responseDATA(res, 200, true);

    } catch (err) {

        console.log(err.errors[0]);

        if (err.errors) {
            if (err.errors[0]) {
                if (err.errors[0].validatorKey == 'is_null') {
                    return responseManagement.responseERROR(res, 422, {
                        type_error: err.errors[0].validatorKey,
                        message: 'Campo no válido : ' + Helpers.arrayNames(err.errors[0].path)
                    });
                }
                if (err.errors[0].validatorKey == 'not_unique') {
                    if (err.errors[0].path == 'email') {
                        return responseManagement.responseERROR(res, 422, {
                            type_error: 'not_unique'
                        });
                    }
                }
                if (err.errors[0].path == 'firstName' || err.errors[0].path == 'lastName') {
                    return responseManagement.responseERROR(res, 422, {
                        type_error: 'only_letters'
                    });
                }
                if (err.errors[0].validatorKey == 'isEmail') {
                    return responseManagement.responseERROR(res, 422, {
                        type_error: 'email_valid'
                    });
                }
            }
        }

        return responseManagement.responseServerERROR(res, 500, {
            type_error: 'server_error'
        });
    }
};

authController.login = async (req, res) => {

    try {

        const data = {
            email: req.body.EMAIL,
            password: req.body.PASSWORD
        };

        params = {
            where: {
                email: data.email
            }
        }

        const user = await Models.User.findOne(params)

        if (user != null) {

        
            if (encrypt.comparePasswordHash(data.password, user.password)) {

                let token = jwtFuncs.signAuth({
                    tokenDate: new Date(),
                    userId: user.id
                })

                return responseManagement.responseDATA(res, 200, {
                    user,
                    token
                });                

            } else {
                return responseManagement.responseJSON(res, 400, 'Contraseña incorrecta');
            }
            

        } else {
            return responseManagement.responseJSON(res, 404, 'Usuario no encontrado');
        }

    } catch (err) {
        if (err.errors) {
            if (err.errors[0]) {
                if (err.errors[0].validatorKey == 'isEmail') {
                    return responseManagement.responseERROR(res, 422, {
                        type_error: 'email_valid'
                    });
                }
            }
        }
        return responseManagement.responseServerERROR(res, 500, err);
    }

};

module.exports = authController;
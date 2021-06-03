const responseManagement = require('../protected/responseManagement');
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');
const Models = require("../models");
var path = require('path');

const {
    Op,
    sequelize,
    Sequelize,
    fn
} = require("sequelize");

const userController = {};

userController.getUserAuth = async (req, res) => {

    try {

        let dataToken = await userController.getUserData(req)

        if(dataToken.userId){

            let params = {
                where : {
                    id : dataToken.userId
                }
            }

            let user = await Models.User.findOne(params)

            return responseManagement.responseDATA(res, 200, {
                user
            });
        }

        return responseManagement.responseJSON(res, 401, 'Unauthenticated');

    } catch (err) {
        console.log(err);
        return responseManagement.responseServerERROR(res, 500, 'server_error');
    }

};

module.exports = userController;

const responseManagement = require('../protected/responseManagement');
const jwtFuncs = require('../protected/jwtFunctions');
const encrypt = require('../protected/encrypt');
const Helpers = require('../helpers/app');
const ChatsController = {};
const {
    Op,
    sequelize,
    Sequelize,
    fn
} = require("sequelize");
const Models = require("../models");


ChatsController.storeMessage = async (req, res) => {

    try {                  
        
        let dataInsert={
            user_id:req.body.user_id,
            message:req.body.message
        }

        var messages= await Models.Chats.create(dataInsert)


        return responseManagement.responseDATA(res, 200, {message:'success'});


    } catch (err) {
        return responseManagement.responseServerERROR(res, 500, err);
    }

}

ChatsController.getMessages = async (req, res) => {

    try {                  
        
        var messages= await Models.Chats.findAll({
            include:[
                {
                    model:Models.User                
                }
            ]
        })

        return responseManagement.responseDATA(res, 200, {messages});


    } catch (err) {
        return responseManagement.responseServerERROR(res, 500, err);
    }

}


module.exports = ChatsController;
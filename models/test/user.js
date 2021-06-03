'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    //RELACIONES
    static associate(models) {      

    }

  };

  User.init({
    firstName: {
      field: 'firstName',
      type : DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
      },
      args: true,
      
    },
    lastName: {
      field: 'lastName',
      type : DataTypes.TEXT,
      allowNull: true,
      validate: {
        is: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
      },
      args: true,
      
    },
    email: {
      field: 'email',
      type : DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,        
      }
    },    
    password: {
      field: 'password',
      type : DataTypes.TEXT,
      allowNull: false
    },       
    typeUserId: {
      field: 'typeUserId',
      type : DataTypes.INTEGER,
      allowNull: false
    }        
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

  return User;
};
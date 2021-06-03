'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const env = 'development';
const config = require(__dirname + '/../config/databases.json')[env];

const db = {};

const databases = Object.keys(config.databases);

for(let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.databases[database];
  dbPath.logging = false
  //Store the database connection in our db object
  db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, dbPath );
}

var models = [
  'test'
];

models.forEach(element => {
  fs
    .readdirSync(__dirname + '/'+element)
    .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = require(path.join(__dirname + '/'+element, file))(db[element], Sequelize.DataTypes);
      db[model.name] = model;
    });    
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

module.exports = db;

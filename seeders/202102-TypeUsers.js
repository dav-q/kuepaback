'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('type_users', [
      {
        id: 1,
        name:'Moderador',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      },
      {
        id: 2,
        name:'Estudiante',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('type_users', null, {});
  }
};
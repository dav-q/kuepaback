'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName:'Pepito',
        lastName:'Perez',
        email:'pepitoperez@mail.com',
        password:'$2b$10$FKUi6LmFBJgGOe/D0edInuLg//b6d09Vr6mHni2zA5twpGEH/PBYS',
        typeUserId:1,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Technicians', [{
      RideId: 1,
      username: 'tech',
      name: 'Mr. MeeFix',
      password: 'tech',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Technicians', null, {})
  }
};
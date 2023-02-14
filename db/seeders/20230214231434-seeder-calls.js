'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Calls', [
      {
        phoneNumberFrom: '1112341234',
        phoneNumberTo: '2212341234',
        timeInit: '2023-02-14 20:16:00',
        createdAt: '2023-02-14 20:16:00',
        updatedAt: '2023-02-14 20:16:00'
      },
      {
        phoneNumberFrom: '1112341234',
        phoneNumberTo: '2212341234',
        timeInit: '2023-02-14 20:16:00',
        timeFinish: '2023-02-14 21:16:00',
        createdAt: '2023-02-14 20:16:00',
        updatedAt: '2023-02-14 20:16:00'
      },
      {
        phoneNumberFrom: '1112341234',
        phoneNumberTo: '2212341234',
        timeInit: '2023-02-14 20:16:00',
        createdAt: '2023-02-14 20:16:00',
        updatedAt: '2023-02-14 20:16:00'
      }
  ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Calls', null, {});
    
  }
};

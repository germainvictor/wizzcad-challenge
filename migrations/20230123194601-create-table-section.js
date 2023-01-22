'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable(
      'section',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        sectionId: {
          allowNull: true,
          type: DataTypes.INTEGER
        },
        formId: {
          allowNull: true,
          type: DataTypes.INTEGER
        },
        softDeleted: {
          allowNull: false,
          defaultValue: false,
          type: DataTypes.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE
        }
      },
      {
        schema: 'public'
      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

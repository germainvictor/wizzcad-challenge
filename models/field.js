'use strict'
module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define(
    'field',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['BOOLEAN', 'LIST', 'DIGITAL', 'TEXT']]
        }
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
      required: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      softDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      defaultValue: null
    }
  )

  Field.associate = models => {
    Field.belongsTo(models.form)
    Field.belongsTo(models.section)
  }


  return Field
}

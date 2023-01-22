'use strict'
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define(
    'form',
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
    },
    {
      freezeTableName: true,
      paranoid: true,
      defaultValue: null
    }
  )


  Form.associate = models => {
    Form.hasMany(models.section, { as: 'sections' })
    Form.hasMany(models.field, { as: 'fields' })
  }

  return Form
}

'use strict'
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
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

  Section.associate = models => {
    Section.belongsTo(models.form)
    Section.hasMany(models.section)
    Section.hasMany(models.field)
  }


  return Section
}

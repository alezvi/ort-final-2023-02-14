'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Call extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // una llamada tiene un registro de cargaos por llamar
      Call.hasOne(models.CallCharge)
    }
  }
  Call.init({
    phoneNumberFrom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumberTo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeInit: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeFinish: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Call',
    tableName: 'Calls'
  });
  return Call;
};
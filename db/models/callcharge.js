'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CallCharge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // un registro de cargo por llamada pertece a una llamada
      CallCharge.belongsTo(models.Call)
    }
  }
  CallCharge.init({
    totalCallTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalToPay: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    callId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CallCharge',
    tableName: 'CallCharges'
  });
  return CallCharge;
};
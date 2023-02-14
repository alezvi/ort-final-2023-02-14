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
      // define association here
    }
  }
  Call.init({
    phoneNumberFrom: DataTypes.STRING,
    phoneNumberTo: DataTypes.STRING,
    timeInit: DataTypes.DATE,
    timeFinish: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Call',
  });
  return Call;
};
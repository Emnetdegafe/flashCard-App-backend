'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subject.belongsTo(models.user)
      subject.hasMany(models.flashcard)

      // define association here
    }
  };
  subject.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subject',
  });
  return subject;
};
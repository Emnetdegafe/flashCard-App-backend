'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      flashcard.belongsTo(models.subject)

      // define association here
    }
  };
  flashcard.init({
    name: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'flashcard',
  });
  return flashcard;
};
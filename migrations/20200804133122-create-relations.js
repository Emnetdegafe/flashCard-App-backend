'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subjects", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("flashcards", "subjectId", {
      type: Sequelize.INTEGER,
      references: {
        model: "subjects",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subjects", "userId");
    await queryInterface.removeColumn("flashcards", "subjectId");
  }
};

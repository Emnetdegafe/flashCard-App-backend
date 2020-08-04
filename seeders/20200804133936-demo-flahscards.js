'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "flashcards",
      [
        {
          name: "comparison operators",
          question: "Which one of these is not a comparison operator?",
          answer: "=",
          status: false,
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Local state",
          question: "A react hook used to store data locally",
          answer: "useState",
          status: true,
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fetching data",
          question: "React hook used to control side effects",
          answer: "useEffect",
          status: false,
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Structure of functions",
          question: "Which on of this logical operators negate a statement?",
          answer: "!",
          status: true,
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("flashcards", null, {});

  }
};

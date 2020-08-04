const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Flashcard = require("../models/").flashcard;
const Subject = require("../models/").subject;
const User = require("../models/").user;
const Sequelize = require('sequelize');

const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.get("/:id", authMiddleware, async (req, res, next) => {

	const { user } = req
	const { id } = req.params
	try {
		const flashcard = await Flashcard.findByPk(id, {
			include: [{
				model: Subject,
				include: [User]
			}]
		})

		if (flashcard.subject.user.id !== user.id) return res.status(401).send('unauthorized to see this card')
		// Already authorized to see this card

		const alt = await Flashcard.findAll({ order: Sequelize.literal('random()'), limit: 3 })
		//TODO add where:... when we have more flahscards

		const responseObj = {
			flashcard: flashcard,
			alt
		}

		return res.send(responseObj)


	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "Something went wrong, sorry" });
	}
});


module.exports = router;
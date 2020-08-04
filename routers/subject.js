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
		const subject = await Subject.findByPk(id, {
			include: [
				Flashcard
			]
		})

		if (subject.userId !== user.id) {
			return res.status(401).send('unauthorized to see this subject')
		}
		// Already authorized to see this card



		return res.send(subject)


	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "Something went wrong, sorry" });
	}
});
router.get("/", authMiddleware, async (req, res, next) => {

	const { user } = req
	try {
		const userInDb = await User.findByPk(user.id, {
			include: [
				Subject
			]
		})
		return res.send(userInDb)


	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "Something went wrong, sorry" });
	}
});


module.exports = router;

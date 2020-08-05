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


router.post("/", authMiddleware, async (req, res, next) => {

	const { user } = req
	const { flashcard } = req.body

	console.log('body', req.body)
	try {
		const userInDb = await User.findByPk(user.id, { include: [Subject] })

		const subjectIds = userInDb.subjects.map(subject => subject.id)

		if (!subjectIds.includes(flashcard.subjectId)) return res.status(401).send('You are unauthorized')

		// Already authorized to modify this subject

		const flashcardInDb = await Flashcard.create(flashcard)

		return res.send({ flashcard: flashcardInDb })

	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "Something went wrong, sorry" });
	}
});



router.put("/:id", authMiddleware, async (req, res, next) => {

	const { user } = req
	const { id } = req.params
	const { status } = req.body
	try {
		const flashcard = await Flashcard.findByPk(id, {
			include: [{
				model: Subject,
				include: [User]
			}]
		})

		if (flashcard.subject.user.id !== user.id) return res.status(401).send('unauthorized to see this card')
		// Already authorized to see this card

		flashcard.status = status
		//TODO add where:... when we have more flahscards

		const flashcardInDb = await flashcard.save()

		return res.send(flashcardInDb)


	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "Something went wrong, sorry" });
	}
});



module.exports = router;

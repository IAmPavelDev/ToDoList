const bcrypt = require("bcrypt");
const { User, List } = require("./../models/models");
const jwt = require("jsonwebtoken");

function jwtGenerator(id, email) {
	return jwt.sign({ id: id, email }, process.env.SECRET_KEY, {
		expiresIn: "24h",
	});
}

class UserController {
	async registration(req, res) {
		const { email, password } = req.body;
		if (!email || !password) {
			res.json("Error");
		}
		const candidate = await User.findOne({ where: { email } });
		console.log(candidate);
		if (candidate) {
			return res.json("User already existed");
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ email, password: hashPassword });
		console.log(user.id);
		const listIdOfItems = await List.create({ listId: user.id });
		const token = jwtGenerator(user.id, email);
		res.json({ token, listIdOfItems });
	}
	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		const listIdOfItems = await List.findOne({ where: { listId: user.id } });
		if (!user) {
			res.json("User does not exist");
		}
		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			res.json("Invalid password");
		}
		const token = jwtGenerator(user.id, email);
		res.json({ token, listIdOfItems });
	}
	async check(req, res) {
		res.json("all right");
	}
}

module.exports = new UserController();

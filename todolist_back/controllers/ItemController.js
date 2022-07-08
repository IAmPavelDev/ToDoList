const { item } = require("../models/models");

class ItemController {
	async create(req, res) {
		const { name, main } = req.body;
		const _item = await item.create({ name, main });
        console.log(_item);
		return res.json(_item);
	}
	async get(req, res) {
		const _item = await item.findAndCountAll();
		return res.json(_item);
	}
	async edit(req, res) {}
    async delete(req, res) {
        const { name, main, id } = req.body;
		item.destroy({where: {name, main, id }});
		return res.json("success");
    }
}

module.exports = new ItemController();

const { item } = require("../models/models");

class ItemController {
	async create(req, res) {
		const { name, main } = req.body;
        console.log("user", req.user.id);
		const _item = await item.create({ name, main, listId: req.user.id });
		return res.json(_item);
	}
	async get(req, res) {
		const _item = await item.findAndCountAll({where: {listId: req.user.id}});
        console.log(_item);
		return res.json(_item);
	}
	async edit(req, res) {
        
    }
    async delete(req, res) {
        const { name, main, id } = req.body;
		item.destroy({where: {name, main, id, listId: req.user.id }});
		return res.json("success");
    }
}

module.exports = new ItemController();

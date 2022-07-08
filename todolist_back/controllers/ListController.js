const {ItemList} = require('../models/models');

class ListController {
    async get(req, res) {
        const _list = await ItemList.findAll();
        res.json(_list);
    }
}

module.exports = new ListController();
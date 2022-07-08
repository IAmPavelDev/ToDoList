const Router = require('express');
const controller = require('./../controllers/ListController')
const router = new Router();

router.get('/', controller.get);

module.exports = router;
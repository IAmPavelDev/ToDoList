const Router = require('express');
const controller = require('./../controllers/ItemController');
const router = new Router();
const auth = require("./../middleware/authMiddleware");

router.post('/', auth, controller.create);
router.post('/edit', auth, controller.edit);
router.post('/delete', auth, controller.delete);
router.get('/', auth, controller.get);

module.exports = router;
const Router = require('express');
const controller = require("./../controllers/UserController");
const auth = require("./../middleware/authMiddleware");
const router = new Router();

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/auth', auth, controller.check);

module.exports = router;
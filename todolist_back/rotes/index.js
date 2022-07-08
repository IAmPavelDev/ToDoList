const Router = require('express');
const User = require('./User');
const List = require('./List');
const Item = require('./Item');
const router = new Router();

router.use('/user', User)
router.use('/list', List)
router.use('/item', Item)
module.exports = router;
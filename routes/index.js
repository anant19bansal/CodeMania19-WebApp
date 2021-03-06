const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_contoller');
console.log('Router loaded!!');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));
router.use('/reset-password', require('./reset-password'));
router.use('/likes', require('./likes'));
router.use('/friends', require('./friends'));
//for any other router access from here
//router.use('/routerName', require('./routerFile'));

module.exports = router;
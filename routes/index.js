const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_contoller');
console.log('Router loaded!!');


router.get('/', homeController.home);
router.use('/users', require('./users'));

//for any other router access from here
//router.use('/routerName', require('./routerFile'));

module.exports = router;
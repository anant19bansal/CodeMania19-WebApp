const express = require('express');
const router = express.Router();
const passport = require('passport');
const friendsController = require('../controllers/friendships_controller');

router.get('/add/:id', passport.checkAuthentication, friendsController.addFriend);
router.get('/remove/:id', passport.checkAuthentication, friendsController.removeFriend);

module.exports = router;
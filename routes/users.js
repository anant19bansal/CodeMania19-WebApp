const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',passport.checkAuth ,usersController.signUp);
router.get('/sign-in', passport.checkAuth,usersController.signIn);
router.post('/create', usersController.create);
router.post('/search', usersController.searchUser);
// router.post('/update-avatar/:id', passport.checkAuthentication,usersController.updateAvatar);
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), usersController.createSession);

module.exports = router;



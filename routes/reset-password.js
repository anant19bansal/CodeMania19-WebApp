const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/reset_password_controller');

router.get('/enter-email', resetPasswordController.enterEmail);
router.post('/send-email', resetPasswordController.sendEmail);
router.get('/:token', resetPasswordController.newPassword);
router.post('/:token', resetPasswordController.resetPassword);

module.exports = router;
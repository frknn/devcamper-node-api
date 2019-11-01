const express = require('express');
const { register, login, getCurrentUser, forgotPassword, resetPassword, updateNameAndMail, updatePassword } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updatedetails', protect, updateNameAndMail);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
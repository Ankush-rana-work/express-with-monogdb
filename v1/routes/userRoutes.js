const router = require('express').Router();
const UserController = require('../controllers/userController');
const userSchema = require('../requestSchema/userSchema');

router.post('/register', userSchema.register, UserController.register);
router.post('/login', userSchema.login, UserController.login);
router.post('/refresh-token', userSchema.refreshToken, UserController.refreshToken);

module.exports = router;
const express = require('express');
const { registerController, loginController, userController, refreshController } = require('../controllers');
const auth  = require('../middlewares/auth');
const router = express.Router();

router.use(express.json());

// API for the registration of the user & register is the function of the registerController called here.
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/user', auth, userController.userInfo);
router.post('/refresh', refreshController.refresh);

module.exports = router;

const express = require('express');
const { registerController, loginController } = require('../controllers');
const router = express.Router();

router.use(express.json());

// API for the registration of the user & register is the function of the registerController called here.
router.post('/register', registerController.register);
router.post('/login', loginController.login);
module.exports = router;

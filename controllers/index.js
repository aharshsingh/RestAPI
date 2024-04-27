const registerController = require('./auth/registerController');
const loginController = require('./auth/loginController');
const userController = require('./auth/userController');
const refreshController = require('./auth/refreshController');
const logoutController = require('./auth/logoutController');
const productController = require('./productController');

module.exports = { registerController, loginController, userController, refreshController, logoutController, productController };

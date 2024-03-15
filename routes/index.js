import express from 'express';
import { registerController } from '../controllers'
const router = express();

router.use(express.json());
//APi for the registration of the user & register is the function of the registerController called here.
router.post('/register',registerController.register);       

export default router;
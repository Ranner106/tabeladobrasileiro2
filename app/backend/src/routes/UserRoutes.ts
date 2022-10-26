import { Router } from 'express';
import userController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

router.post('/', validateLogin, userController.login);

export default router;

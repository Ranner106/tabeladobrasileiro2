import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();
const ControllerUser = new UserController();
router.post('/', validateLogin, ControllerUser.login);

export default router;

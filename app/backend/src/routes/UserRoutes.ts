import { Router } from 'express';
import validateAuth from '../middlewares/validateAuth';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const router = Router();
const controllerUser = new UserController();

router.post('/', validateLogin, controllerUser.login);
router.get('/validate', validateAuth, controllerUser.getRole);

export default router;

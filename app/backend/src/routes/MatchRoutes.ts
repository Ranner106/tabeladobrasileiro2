import { Router } from 'express';
import validateMatchCreation from '../middlewares/validateMatchCreation';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchesController = new MatchController();

router.get('/', matchesController.getMaches);
router.post('/', validateToken, validateMatchCreation, matchesController.createMatch);

export default router;

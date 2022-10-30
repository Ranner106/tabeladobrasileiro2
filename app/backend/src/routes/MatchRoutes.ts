import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchesController = new MatchController();

router.get('/', matchesController.getMaches);

export default router;

import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const controllerTeam = new TeamController();

router.get('/', controllerTeam.getTeams);

export default router;

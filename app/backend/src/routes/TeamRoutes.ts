import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const controllerTeam = new TeamController();

router.get('/', controllerTeam.getTeams);
router.get('/:id', controllerTeam.getTeamById);

export default router;

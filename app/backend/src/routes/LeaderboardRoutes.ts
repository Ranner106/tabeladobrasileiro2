import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const controllerLeaderBoard = new LeaderboardController();

router.get('/', controllerLeaderBoard.getAllscores);
router.get('/home', controllerLeaderBoard.getHomeScores);
router.get('/away', controllerLeaderBoard.getAwayScores);

export default router;

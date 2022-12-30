import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public getAllscores = async (_req: Request, res: Response) => {
    try {
      const scores = await this.service.getScores();

      return res.status(httpStatus.ok).json(scores);
    } catch (error) {
      return res.status(httpStatus.internalServerError).json(error);
    }
  };

  public getHomeScores = async (_req: Request, res: Response) => {
    try {
      const scores = await this.service.getScores('homeTeam');

      return res.status(httpStatus.ok).json(scores);
    } catch (error) {
      return res.status(httpStatus.internalServerError).json(error);
    }
  };

  public getAwayScores = async (_req: Request, res: Response) => {
    try {
      const scores = await this.service.getScores('awayTeam');

      return res.status(httpStatus.ok).json(scores);
    } catch (error) {
      return res.status(httpStatus.internalServerError).json(error);
    }
  };
}

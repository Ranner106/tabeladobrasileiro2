import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import MatchService from '../services/MatchService';

export default class MatchController {
  service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getMaches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    console.log(inProgress);

    if (inProgress) {
      const matches = await this.service.getMatchesInprogress(
        inProgress === 'true',
      );
      return res.status(200).json(matches);
    }
    if (inProgress) {
      const matcheFalse = await this.service.getMatchesInprogress(
        inProgress === 'false',
      );
      return res.status(200).json(matcheFalse);
    }
    const matche = await this.service.getMatches();
    return res.status(200).json(matche);
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const newMatchData = req.body;
      const { homeTeam, awayTeam } = newMatchData;
      if (homeTeam === awayTeam) {
        return res.status(httpStatus.unproccessableEntity).json({
          message: 'It is not possible to create a match with two equal teams',
        });
      }

      const newMatch = await this.service.createMatch(newMatchData);
      return res.status(httpStatus.created).json(newMatch);
    } catch (error) {
      console.log(error);
    }
  };

  public finishMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const message = await this.service.finishMatch(Number(id));
      return res.status(httpStatus.ok).json({ message });
    } catch (error) {
      console.log(error);
    }
  };
}

import { Request, Response } from 'express';
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
}

import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import TeamService from '../services/TeamService';

export default class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
    this.getTeams = this.getTeams.bind(this);
    this.getTeamById = this.getTeamById.bind(this);
  }

  public async getTeams(_req: Request, res: Response) {
    try {
      const teams = await this.service.getTeams();

      return res.status(httpStatus.ok).json(teams);
    } catch (error) {
      return res.status(httpStatus.internalServerError).json(error);
    }
  }

  public async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(Number(id));

      if (!team) {
        return res.status(httpStatus.notFound).json({ message: 'Team not found' });
      }

      return res.status(httpStatus.ok).json(team);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.internalServerError).json(error);
    }
  }
}

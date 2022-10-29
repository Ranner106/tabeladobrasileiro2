import Team from '../database/models/Team';
import { Iteam } from '../interfaces/teamInterfaces';

export default class TeamService {
  public model = Team;

  constructor() {
    this.getTeams = this.getTeams.bind(this);
    this.getTeamById = this.getTeamById.bind(this);
  }

  public async getTeams(): Promise<Iteam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getTeamById(id: number): Promise<Iteam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}

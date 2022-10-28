import Team from '../database/models/Team';
import { Iteam } from '../interfaces/teamInterfaces';

export default class TeamService {
  public model = Team;

  constructor() {
    this.getTeams = this.getTeams.bind(this);
  }

  public async getTeams(): Promise<Iteam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

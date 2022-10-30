import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService {
  public getMatches = async () => {
    const macthes = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return macthes;
  };

  public getMatchesInprogress = async (inProgress: boolean) => {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };
}

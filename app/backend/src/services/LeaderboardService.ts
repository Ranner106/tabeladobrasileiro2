import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { getTeamScore, tiebreak } from '../utils/leaderboardCalcs';

export default class LeaderboardService {
  public getScores = async (option?: 'homeTeam' | 'awayTeam') => {
    const teams = await Team.findAll();
    let matches = await Match.findAll({ where: { inProgress: false } });
    let scores = teams.map((team: Team) => ({
      name: team.teamName,
      ...getTeamScore(matches, team.id),
    }));

    if (option?.length) {
      scores = teams.map((team: Team) => {
        matches = matches.filter((match) => match[option] === team.id);
        console.log(matches);
        return {
          name: team.teamName,
          ...getTeamScore(matches, team.id),
        };
      });
    }

    const orderedScores = tiebreak(scores);

    return orderedScores;
  };
}

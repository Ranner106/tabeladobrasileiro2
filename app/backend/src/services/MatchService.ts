import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ICreateMatch } from '../interfaces/matchInterfaces';

type MatchUpdate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

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

  public createMatch = async (newMatchData: ICreateMatch) => {
    const newMatch = await Match.create({
      ...newMatchData,
      inProgress: true,
    });
    return newMatch;
  };

  public finishMatch = async (id: number) => {
    await Match.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  };

  public updateMatch = async (id: number, update: MatchUpdate) => {
    const { homeTeamGoals, awayTeamGoals } = update;
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated';
  };
}

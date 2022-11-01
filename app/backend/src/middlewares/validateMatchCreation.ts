import { Request, Response, NextFunction } from 'express';
import { ICreateMatch } from '../interfaces/matchInterfaces';
import httpStatus from '../utils/httpStatus';
import TeamService from '../services/TeamService';

type CustomError = {
  type: number | null;
  message: string;
};

const validateProps = (newMatchData: ICreateMatch): CustomError => {
  const requiredProps = ['homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals'];
  for (let i = 0; i < requiredProps.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(newMatchData, requiredProps[i])) {
      return { type: httpStatus.badRequest, message: `${requiredProps[i]} is required` };
    }
  }
  return { type: null, message: '' };
};

const validateTeams = async (homeId: number, awayId: number): Promise<CustomError> => {
  const teamService = new TeamService();

  const teamIds = [homeId, awayId];
  const teamsFromDB = await Promise.all(teamIds.map(teamService.getTeamById));

  const allIdsAreValid = teamsFromDB.every((team) => team !== null);

  if (!allIdsAreValid) {
    return {
      type: httpStatus.notFound,
      message: 'There is no team with such id!',
    };
  }

  return { type: null, message: '' };
};

const validateMatchCreation = async (req: Request, res: Response, next: NextFunction) => {
  const newMatchData = req.body as ICreateMatch;

  let { type, message } = validateProps(newMatchData);
  if (type) {
    return res.status(type).json({ message });
  }

  const { homeTeam, awayTeam } = newMatchData;
  ({ type, message } = await validateTeams(homeTeam, awayTeam));
  if (type) {
    return res.status(type).json({ message });
  }

  next();
};

export default validateMatchCreation;

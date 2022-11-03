import Match from '../database/models/Match';

type TeamScore = {
  name?: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

const getTotalGames = (matches: Match[], id: number): number => {
  const totalGames = matches.reduce((acc, match) => {
    if (match.homeTeam === id || match.awayTeam === id) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return totalGames;
};

const getTotalVictories = (matches: Match[], id: number): number => {
  const totalVictories = matches.reduce((acc, match) => {
    if ((match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return totalVictories;
};

const getTotalDraws = (matches: Match[], id: number): number => {
  const totalDraws = matches.reduce((acc, match) => {
    if ((match.homeTeam === id && match.homeTeamGoals === match.awayTeamGoals)
        || (match.awayTeam === id && match.awayTeamGoals === match.homeTeamGoals)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return totalDraws;
};

const getTotalLosses = (matches: Match[], id: number): number => {
  const totalLosses = matches.reduce((acc, match) => {
    if ((match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return totalLosses;
};

const getGoalsFavor = (matches: Match[], id: number): number => {
  const goalsFavor = matches.reduce((acc, match) => {
    if (match.homeTeam === id) {
      return acc + match.homeTeamGoals;
    }
    if (match.awayTeam === id) {
      return acc + match.awayTeamGoals;
    }
    return acc;
  }, 0);
  return goalsFavor;
};

const getGoalsOwn = (matches: Match[], id: number): number => {
  const goalsFavor = matches.reduce((acc, match) => {
    if (match.homeTeam === id) {
      return acc + match.awayTeamGoals;
    }
    if (match.awayTeam === id) {
      return acc + match.homeTeamGoals;
    }
    return acc;
  }, 0);
  return goalsFavor;
};

const getTeamScore = (matches: Match[], id: number): TeamScore => {
  const totalGames = getTotalGames(matches, id);
  const totalVictories = getTotalVictories(matches, id);
  const totalDraws = getTotalDraws(matches, id);
  const totalLosses = getTotalLosses(matches, id);
  const goalsFavor = getGoalsFavor(matches, id);
  const goalsOwn = getGoalsOwn(matches, id);
  const goalsBalance = goalsFavor - goalsOwn;
  const totalPoints = totalVictories * 3 + totalDraws;
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

  return { totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency };
};

const tiebreak = (scores: TeamScore[]): TeamScore[] => {
  const orderedScores = scores.sort((prev, curr) => {
    let index = curr.totalPoints - prev.totalPoints;
    if (!index) index = curr.totalVictories - prev.totalVictories;
    if (!index) index = curr.goalsBalance - prev.goalsBalance;
    if (!index) index = curr.goalsFavor - prev.goalsFavor;
    if (!index) index = curr.goalsOwn - prev.goalsOwn;
    return index;
  });
  return orderedScores;
};

export { getTeamScore, tiebreak };

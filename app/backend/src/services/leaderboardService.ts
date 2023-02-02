import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import TeamService from './teamService';

export default class LeaderboardService {
  constructor(
    private _teamService = new TeamService(),
    private _matchModel = Match,
  ) {}

  public async getLeaderboard(path: 'home' | 'away') {
    const teams = await this._teamService.getTeams();
    const leaderboard = Promise.all(teams.map((team) => this.getTeamStats(team, path)));
    const ordenatedRank = LeaderboardService.ordenateRank(await leaderboard);
    return ordenatedRank;
  }

  private async getTeamStats(team: ITeam, path: 'home' | 'away') {
    const teamMatches = await this._matchModel.findAll({
      where: { [`${path}TeamId`]: team.id },
    });

    const matchesResults = LeaderboardService.getMatchesResults(teamMatches, path);
    const goalsResults = LeaderboardService.getGoals(teamMatches, path);
    const points = (matchesResults.totalVictories * 3) + (matchesResults.totalDraws * 1);
    const teamEfficiency = ((points / (teamMatches.length * 3)) * 100).toFixed(2);
    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: teamMatches.length,
      ...matchesResults,
      ...goalsResults,
      efficiency: teamEfficiency,
    };
  }

  private static getMatchesResults(matches: Array<IMatch>, path: 'home' | 'away') {
    const enemy = path === 'home' ? 'away' : 'home';
    const result = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
    matches.forEach((m) => {
      if (m[`${path}TeamGoals`] > m[`${enemy}TeamGoals`]) result.totalVictories += 1;
      if (m[`${path}TeamGoals`] < m[`${enemy}TeamGoals`]) result.totalLosses += 1;
      if (m[`${path}TeamGoals`] === m[`${enemy}TeamGoals`]) result.totalDraws += 1;
    });
    return result;
  }

  private static getGoals(matches: Array<IMatch>, path: 'home' | 'away') {
    const enemy = path === 'home' ? 'away' : 'home';
    const result = {
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
    matches.forEach((m) => {
      result.goalsFavor += m[`${path}TeamGoals`];
      result.goalsOwn += m[`${enemy}TeamGoals`];
    });
    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    return result;
  }

  private static ordenateRank(leaderboard: Array<ILeaderboard>) {
    return leaderboard.sort((a, b) => b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
  }
}

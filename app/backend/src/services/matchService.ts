import ApiError from '../error/apiError';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';

export default class MatchService {
  constructor(private _matchModel = Match) {}

  public async getMatches(inProgress: string | undefined) {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ] });
    if (inProgress === 'true') {
      return matches.filter((m) => m.dataValues.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((m) => m.dataValues.inProgress === false);
    }
    return matches;
  }

  public async createMatch(match: IMatch): Promise<IMatch> {
    const createdMatch = await this._matchModel.create({
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return createdMatch;
  }

  public async finishMatch(matchId:string) {
    const [affectedCount] = await this._matchModel.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    if (affectedCount === 0) throw new ApiError(404, 'Match not found');
  }
}

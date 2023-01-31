import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
}

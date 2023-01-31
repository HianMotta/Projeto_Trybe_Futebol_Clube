import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  constructor(private _matchModel = Match) {}

  public async getMatches(inProgress: string | undefined) {
    let status;

    if (inProgress) {
      status = inProgress === 'true';
    }

    const matches = await this._matchModel.findAll({
      where: { inProgress: status },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ] });
    return matches;
  }
}

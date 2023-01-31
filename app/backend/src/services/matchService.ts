import Match from '../database/models/Match';

export default class MatchService {
  constructor(private _matchModel = Match) {}

  public async getMatches() {
    const matches = await this._matchModel.findAll();
    return matches;
  }
}

import Team from '../database/models/Team';

export default class TeamService {
  constructor(private _teamModel = Team) {}

  public async getTeams() {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}

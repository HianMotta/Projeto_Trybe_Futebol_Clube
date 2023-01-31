import ApiError from '../error/apiError';
import Team from '../database/models/Team';

export default class TeamService {
  constructor(private _teamModel = Team) {}

  public async getTeams() {
    const teams = await this._teamModel.findAll();
    return teams;
  }

  public async getTeamById(teamId: string) {
    const team = await this._teamModel.findOne({ where: { id: teamId } });
    if (!team) throw new ApiError(404, 'Team not found');
    return team;
  }
}

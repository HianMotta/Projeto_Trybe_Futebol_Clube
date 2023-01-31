import { Response, Request } from 'express';
import MatchService from '../services/matchService';

const matchService = new MatchService();

const getMatches = async (_req: Request, res: Response) => {
  const matches = await matchService.getMatches();
  console.log(matches);
  return res.status(200).json(matches);
};

export default getMatches;

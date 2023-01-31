import { Response, Request } from 'express';
import MatchService from '../services/matchService';

const matchService = new MatchService();

const getMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await matchService.getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
};

export default getMatches;

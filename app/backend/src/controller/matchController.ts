import { Response, Request } from 'express';
import MatchService from '../services/matchService';

const matchService = new MatchService();

const getMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await matchService.getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
};

const createMatch = async (req: Request, res: Response) => {
  const match = await matchService.createMatch(req.body);
  return res.status(201).json(match);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await matchService.finishMatch(id);
  return res.status(200).json({ message: 'Finished' });
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;
  await matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
  return res.status(200).json({ message: 'Match updated' });
};

export {
  getMatches,
  finishMatch,
  createMatch,
  updateMatch,
};

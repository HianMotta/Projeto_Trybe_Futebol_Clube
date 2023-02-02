import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

const leaderboardService = new LeaderboardService();

const getHomeLeaderboard = async (_req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getLeaderboard('home');
  return res.status(200).json(leaderboard);
};

const getAwayLeaderboard = async (_req: Request, res: Response) => {
  const leaderboard = await leaderboardService.getLeaderboard('away');
  return res.status(200).json(leaderboard);
};

export { getHomeLeaderboard, getAwayLeaderboard };

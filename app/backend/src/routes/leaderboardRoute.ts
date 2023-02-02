import * as express from 'express';
import { getHomeLeaderboard, getAwayLeaderboard } from '../controller/leaderboardController';

const route = express.Router();

route.get('/home', getHomeLeaderboard);
route.get('/away', getAwayLeaderboard);

export default route;

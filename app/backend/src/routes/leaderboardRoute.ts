import * as express from 'express';
import {
  getHomeLeaderboard,
  getAwayLeaderboard,
  getAllTeamsLeaderboard,
}
  from '../controller/leaderboardController';

const route = express.Router();

route.get('/home', getHomeLeaderboard);
route.get('/away', getAwayLeaderboard);
route.get('/', getAllTeamsLeaderboard);

export default route;

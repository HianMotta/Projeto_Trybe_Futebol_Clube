import * as express from 'express';
import { getTeams, getTeamById } from '../controller/teamController';

const route = express.Router();

route.get('/', getTeams);
route.get('/:id', getTeamById);

export default route;

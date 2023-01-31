import * as express from 'express';
import getTeams from '../controller/teamController';

const route = express.Router();

route.get('/', getTeams);

export default route;

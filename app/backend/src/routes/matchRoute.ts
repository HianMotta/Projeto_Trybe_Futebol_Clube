import * as express from 'express';
import getMatches from '../controller/matchController';

const route = express.Router();

route.get('/', getMatches);

export default route;

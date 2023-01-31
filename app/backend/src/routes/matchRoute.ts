import * as express from 'express';
import { getMatches, finishMatch } from '../controller/matchController';

const route = express.Router();

route.get('/', getMatches);
route.patch('/:id/finish', finishMatch);

export default route;

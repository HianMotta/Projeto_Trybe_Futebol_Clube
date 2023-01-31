import * as express from 'express';
import { getMatches, finishMatch, createMatch } from '../controller/matchController';

const route = express.Router();

route.get('/', getMatches);
route.post('/', createMatch);
route.patch('/:id/finish', finishMatch);

export default route;

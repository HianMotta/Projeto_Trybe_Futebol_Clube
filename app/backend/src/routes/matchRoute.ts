import * as express from 'express';
import validateMatch from '../middlewares/validateMatch';
import { getMatches, finishMatch, createMatch, updateMatch } from '../controller/matchController';

const route = express.Router();

route.get('/', getMatches);
route.post('/', validateMatch, createMatch);
route.patch('/:id/finish', finishMatch);
route.patch('/:id', updateMatch);

export default route;

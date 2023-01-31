import * as express from 'express';
import validateMatch from '../middlewares/validateMatch';
import { getMatches, finishMatch, createMatch } from '../controller/matchController';

const route = express.Router();

route.get('/', getMatches);
route.post('/', validateMatch, createMatch);
route.patch('/:id/finish', finishMatch);

export default route;

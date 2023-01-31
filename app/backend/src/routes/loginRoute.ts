import * as express from 'express';
import validateJWT from '../middlewares/validateJWT';
import { getUserRole, login } from '../controller/userController';
import loginAuth from '../middlewares/loginAuth';

const route = express.Router();

route.get('/validate', validateJWT, getUserRole);
route.post('/', loginAuth, login);

export default route;

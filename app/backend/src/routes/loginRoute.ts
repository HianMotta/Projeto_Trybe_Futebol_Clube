import * as express from 'express';
import login from '../controller/userController';
import loginAuth from '../middlewares/loginAuth';

const route = express.Router();

route.post('/', loginAuth, login);

export default route;

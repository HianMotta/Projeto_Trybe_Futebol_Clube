import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

const login = async (req: Request, res: Response) => {
  const userToken = await userService.login(req.body);
  return res.status(200).json({ token: userToken });
};

export default login;

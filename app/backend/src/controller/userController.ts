import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

const login = async (req: Request, res: Response) => {
  const userToken = await userService.login(req.body);
  return res.status(200).json({ token: userToken });
};

const getUserRole = async (req: Request, res: Response) => {
  const { email } = req.body.user;
  const userRole = await userService.getUserRole(email);
  return res.status(200).json({ role: userRole });
};

export { login, getUserRole };

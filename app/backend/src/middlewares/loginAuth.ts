import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/apiError';

const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'All fields must be filled');
  }

  next();
};

export default loginAuth;

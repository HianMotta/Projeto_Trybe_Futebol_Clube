import { Request, Response, NextFunction } from 'express';
import JWT from '../jwt/jwtUtils';
import ApiError from '../error/apiError';

const jwt = new JWT();

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new ApiError(401, 'Token not found');
  const payload = jwt.validateToken(authorization);
  req.body.user = payload;

  next();
};

export default validateJWT;

import { Request, Response, NextFunction } from 'express';
import httpStatus from '../utils/httpStatus';

const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(httpStatus.unauthorized).json({ message: 'Token not found' });
  }

  next();
};

export default validateAuth;

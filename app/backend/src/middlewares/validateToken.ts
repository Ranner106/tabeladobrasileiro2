import { Request, Response, NextFunction } from 'express';
import httpStatus from '../utils/httpStatus';
import { verifyJWT } from '../utils/JWT';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(httpStatus.unauthorized).json({ message: 'Token not found' });
  }

  const { type, message } = verifyJWT(authorization);
  if (type) {
    return res.status(type).json({ message });
  }

  next();
};

export default validateToken;

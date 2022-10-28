import { sign, verify } from 'jsonwebtoken';

import 'dotenv/config';

interface IPayload {
  email: string;
  password: string;
  role?: string;
}

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const generateJWT = (payload: IPayload) => {
  const token = sign(payload, secret as string, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

export const verifyJWT = (token: string) => {
  try {
    const payload = verify(token, secret as string);
    return { type: null, message: payload };
  } catch (error) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

export const getJWTPayload = (token: string) => {
  const payload = verify(token, secret as string);
  return payload as IPayload;
};

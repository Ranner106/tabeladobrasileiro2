import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import httpStatus from '../utils/httpStatus';
import { comparePasswords } from '../utils/bcrypt';

type ErrorThrower = {
  code: number | null;
  message: string;
};

const isEmailValid = (email: string): boolean => {
  const mailEval = /^(\w+)@[a-z]+(\.[a-z]+){1,2}$/i;
  return mailEval.test(email);
};

const validateEmail = (email: string): ErrorThrower => {
  if (!email || email === '') {
    return { code: httpStatus.badRequest, message: 'All fields must be filled' };
  }
  if (!isEmailValid(email)) {
    return { code: httpStatus.unauthorized, message: 'Incorrect email or password' };
  }
  return { code: null, message: '' };
};

const validatePassword = async (email: string, informedPassword: string) => {
  try {
    const userService = new UserService();
    const user = await userService.getbyEmail(email);
    if (user) {
      const passwordMatches = comparePasswords(informedPassword, user.password);
      return passwordMatches;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { code, message } = validateEmail(email);
  if (code) {
    return res.status(code).json({ message });
  }

  if (!password || password === '') {
    return res.status(httpStatus.badRequest).json({ message: 'All fields must be filled' });
  }

  const passwordMatches = await validatePassword(email, password);
  if (!passwordMatches) {
    return res.status(httpStatus.unauthorized).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validateLogin;

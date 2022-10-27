import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import UserService from '../services/UserService';
import { verifyJWT } from '../utils/JWT';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatus.unauthorized).json({ message: 'Token not found' });
    }

    const { type, message } = verifyJWT(authorization);
    if (type) {
      return res.status(type).json({ message });
    }

    const role = await UserService.getRole(authorization);

    return res.status(httpStatus.ok).json({ role });
  };

  public login = async (req: Request, res: Response) => {
    const loginData = req.body;

    const { type, token } = await this.userService.login(loginData);

    if (type) {
      return res.status(type).json({ message: token });
    }

    return res.status(httpStatus.ok).json({ token });
  };
}

export default UserController;

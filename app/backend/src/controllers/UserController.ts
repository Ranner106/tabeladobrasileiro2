import { Request, Response } from 'express';
import httpStatus from '../utils/httpStatus';
import UserService from '../services/UserService';
// import { verifyJWT } from '../utils/JWT';

class UserController {
  constructor(private userService = new UserService()) {
    this.login = this.login.bind(this);
    // this.getRole = this.getRole.bind(this);
  }

  public login = async (req: Request, res: Response) => {
    const loginData = req.body;

    const { type, token } = await this.userService.login(loginData);

    if (type) {
      return res.status(type).json({ message: token });
    }

    return res.status(httpStatus.ok).json({ token });
  };
}

export default new UserController();

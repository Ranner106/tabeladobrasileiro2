import User from '../database/models/User';
import { generateJWT, getJWTPayload } from '../utils/JWT';
import httpStatus from '../utils/httpStatus';
import { IUserCredentials, IUser } from '../interfaces/userInterfaces';

type TokenResponse = {
  type: number | null,
  token: string,
};

export default class UserService {
  public model = User;

  constructor() {
    this.login = this.login.bind(this);
    this.getbyEmail = this.getbyEmail.bind(this);
  }

  public async getbyEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  static async getRole(token: string) {
    const payload = await getJWTPayload(token);
    return payload.role;
  }

  public async login(credentials: IUserCredentials): Promise<TokenResponse> {
    const { email, password } = credentials;

    const user = await this.getbyEmail(email);

    if (!user) {
      return { type: httpStatus.notFound, token: 'User not found' };
    }

    const token = generateJWT({ email: user.email, password, role: user.role });
    return { type: null, token };
  }
}

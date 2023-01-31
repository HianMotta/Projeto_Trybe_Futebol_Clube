import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import JWT from '../jwt/jwtUtils';
import User from '../database/models/User';
import ApiError from '../error/apiError';

const jwt = new JWT();

export default class UserService {
  constructor(private _userModel = User) {}

  public async login(login: ILogin) {
    const { email, password } = login;

    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const payload = { id: user.id, email };
    const token = jwt.createToken(payload);
    return token;
  }

  public async getUserRole(email: string): Promise<string> {
    const user = await this._userModel.findOne({ where: { email } });
    if (!user) throw new ApiError(401, 'Token not found');
    return user.role;
  }
}

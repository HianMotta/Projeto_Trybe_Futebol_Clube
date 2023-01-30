import * as jwt from 'jsonwebtoken';

interface IPayload {
  id: number
  email: string
}

export default class JWT {
  private _secret: string;
  private _config: object;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'secret';
    this._config = { expiresIn: '1d', algorithm: 'HS256' };
  }

  public createToken(payload: IPayload): string {
    return jwt.sign(payload, this._secret, this._config);
  }

  public validateToken(token:string) {
    return jwt.verify(token, this._secret);
  }
}

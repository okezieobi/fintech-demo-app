import jwt from 'jsonwebtoken';

import Env from './Env';

export default class Jwt {
  constructor(jsonwebtoken = jwt) {
    this.jwt = jsonwebtoken;
  }

  async generate(id = '') {
    const { jwtSecret } = new Env();
    return this.jwt.sign({
      id,
    }, jwtSecret, {
      expiresIn: '3d',
    });
  }

  generateSync(id = '') {
    const { jwtSecret } = new Env();
    return this.jwt.sign({
      id,
    }, jwtSecret, {
      expiresIn: '3d',
    });
  }

  async verify({ token }) {
    const { jwtSecret } = new Env();
    return this.jwt.verify(token, jwtSecret);
  }
}

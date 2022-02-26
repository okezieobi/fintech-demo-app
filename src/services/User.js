import table from '../tables';
import bcrypt from '../utils/bcrypt';
import { SignupSchema } from '../validations/User.login';

export default class UserServices {
  constructor(tables = table, utils = { bcrypt }, schemas = { Signup: SignupSchema }) {
    this.tables = tables;
    this.utils = utils;
    this.schemas = schemas;
    this.signup = this.signup.bind(this);
  }

  async signup(arg = {}) {
    await new this.schemas.Signup(arg.email).validateSchema();
    const response = this.tables.insert(arg).on('query', async (data) => {
      const password = await this.utils.bcrypt.hashString(data.password);
      Object.defineProperty(data, 'password', { value: password });
    });
    return { message: 'New user successfully signed up', data: response };
  }
}

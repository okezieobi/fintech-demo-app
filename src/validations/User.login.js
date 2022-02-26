import { registerSchema } from 'class-validator';

import SignupSchema from './User.signup';

registerSchema({
  name: 'LoginSchema',
  properties: {
    email: [
      { type: 'isEmail' },
    ],
    password: [
      { type: 'isString' },
    ],
  },
});

export default class LoginSchema extends SignupSchema {
  constructor(email, password) {
    super(email);
    this.password = password;
  }
}

export { SignupSchema };

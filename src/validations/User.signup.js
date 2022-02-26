import { registerSchema } from 'class-validator';

import Validator from './index';

registerSchema({
  name: 'SignupSchema',
  properties: {
    email: [
      { type: 'isEmail' },
    ],
  },
});

export default class SignupSchema extends Validator {
  constructor(email = '') {
    super();
    this.email = email;
  }
}

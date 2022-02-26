import { validateOrReject } from 'class-validator';

export default class Validator {
  async validateSchema() {
    return validateOrReject(this.constructor.name, this);
  }
}

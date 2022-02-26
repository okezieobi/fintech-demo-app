import UserServices from '../services/User';
import Controller from '.';
import Jwt from '../utils/Jwt';

export default class UserController extends Controller {
  constructor(Services = UserServices, key = 'user', JWT = Jwt) {
    super(key);
    this.Service = Services;
    this.Jwt = JWT;
    this.setJWT = this.setJWT.bind(this);
    this.signup = this.signup.bind(this);
  }

  setJWT(req, res, next) {
    new this.Jwt().generate(res.locals.user.data.id)
      .then((token) => {
        if (token) {
          res.locals.user.data.token = token;
          next();
        }
      }).catch(next);
  }

  signup({ body }, res, next) {
    const { signup } = new this.Service();
    return this.handleService({
      method: signup, res, next, arg: body, status: 201,
    });
  }
}

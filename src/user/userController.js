import userModel from './userModel.js';

class UserController {
  constructor(user) {
    this.user = user;
  }

  register = function (req, res) {
    this.user.register(req.body, res.send.bind(res));
  };
}

const userController = new UserController(userModel);

export default userController;

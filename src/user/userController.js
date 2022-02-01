import userModel from './userModel.js';

class UserController {
  constructor(user) {
    this.user = user;
    this.amountUsers = 0;
    this.registrarionClosed = false;
  }

  register = function (req, res) {
    if (this.amountUsers >= 500) {
      res.send({ err: 'Error. Too much users.' });
      return;
    }

    if (this.registrarionClosed) {
      res.send({ err: 'Error. Registration closed, pairs already shuffled.' });
      return;
    }

    const handler = function (registeredUserData) {
      res.send(registeredUserData);
    };
    const { wishes } = req.body;
    if (wishes.length === 0) {
      res.send({ err: 'Error. Amount of wishes cant be 0.' });
      return;
    }
    if (wishes.length > 10) {
      res.send({ err: 'Error. Amount of wishes cant be more than 10.' });
      return;
    }
    this.amountUsers += 1;
    this.user.register(req.body, handler);
  };
}

const userController = new UserController(userModel);

export default userController;

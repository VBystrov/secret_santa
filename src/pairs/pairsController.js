import pairsModel from './pairsModel.js';

class UserController {
  constructor(pairs) {
    this.pairs = pairs;
  }

  shuffle = function (req, res) {
    const handler = function (message) {
      res.send(message);
    };
    this.pairs.shuffle(handler);
  };

  getRecipient = function (req, res) {
    const handler = function (recipientData) {
      res.send(recipientData);
    };
    this.pairs.getRecipient(req.params.senderid, handler);
  };
}

const userController = new UserController(pairsModel);

export default userController;

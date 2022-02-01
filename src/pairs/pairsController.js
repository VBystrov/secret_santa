import pairsModel from './pairsModel.js';
import userController from '../user/userController.js';

class PairsController {
  constructor(pairs) {
    this.pairs = pairs;
    this.shuffled = false;
  }

  shuffle = function (req, res) {
    if (userController.amountUsers < 3) {
      res.send({ err: 'Error. Not enougth players.' });
      return;
    }
    if (!this.shuffled) {
      const handler = function (message) {
        res.send(message);
      };
      this.shuffled = true;
      userController.registrarionClosed = true;
      this.pairs.shuffle(handler);
    } else {
      res.send({ err: 'Error. Pairs already shuffled.' });
    }
  };

  getRecipient = function (req, res) {
    const handler = function (recipientData) {
      const { err } = recipientData;
      if (err) {
        res.send({ err });
        return;
      }

      const { first_name: firstName, last_name: lastName } =
        recipientData.data[0];
      const wishes = recipientData.data
        .sort((a, b) => a.wish_number - b.wish_number)
        .map((recipient) => recipient.wish_text);
      res.send({ firstName, lastName, wishes });
    };

    if (this.shuffled) {
      this.pairs.getRecipient(req.params.senderid, handler);
    } else {
      res.send({ err: 'Error. Pairs not shuffled yet.' });
    }
  };
}

const pairsController = new PairsController(pairsModel);

export default pairsController;

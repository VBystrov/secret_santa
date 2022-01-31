import santaDB from '../database/santaDB.js';
import shuffleArray from '../helpers/shuffleArray.js';

class PairsSchema {
  constructor(db) {
    this.db = db;
  }

  shuffle = function (callback) {
    const { db } = this;

    db.run(
      `CREATE TABLE Pairs (
            pairid INTEGER PRIMARY KEY,
            sender INTEGER NOT NULL,
            recipient INTEGER NOT NULL,
            FOREIGN KEY (sender) REFERENCES Users(userid),
            FOREIGN KEY (recipient) REFERENCES Users(userid) )`,
      function (err) {
        if (!err) {
          db.all('SELECT userid from Users', function (err, rows) {
            if (!err) {
              const recipients = shuffleArray(rows.map(({ userid }) => userid));
              const pairs = [];

              pairs.push(
                ` (${recipients[recipients.length - 1]}, ${recipients[0]})`
              );
              for (let i = 1; i < recipients.length; i += 1) {
                pairs.push(` (${recipients[i - 1]}, ${recipients[i]})`);
              }

              db.run(
                `INSERT INTO Pairs (sender,recipient) VALUES${pairs.join(',')}`,
                function (err) {
                  if (!err) {
                    callback({ status: 'Success. Pairs shuffled.' });
                  } else {
                    callback({ status: 'Error. Cannot insert pairs.', err });
                  }
                }
              );
            } else {
              callback({ status: 'Error. Cannot get users ID.', err });
            }
          });
        } else {
          callback({ status: 'Error. Pairs already shuffled.', err });
        }
      }
    );
  };

  getRecipient = function (senderid, callback) {
    const { db } = this;
    db.all(
      `SELECT first_name,last_name,wish_text,wish_number FROM Wishes LEFT JOIN Users ON Users.userid=Wishes.userid WHERE Users.userid=(SELECT recipient FROM Pairs  WHERE sender=${senderid})`,
      (err, rows) => {
        if (err) {
          callback({ status: 'Error. Pairs not shuffled.' });
          return;
        }
        if (!rows) {
          callback({ status: 'Error. Requested id not found.' });
          return;
        }
        callback({ status: 'Success.', data: rows });
      }
    );
  };
}

const userModel = new PairsSchema(santaDB);
export default userModel;

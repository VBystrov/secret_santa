import santaDB from '../database/santaDB.js';

class UserSchema {
  constructor(db) {
    this.db = db;
  }

  register = function (userData, send) {
    const { name, surname, wishes } = userData;
    const { db } = this;
    db.run(
      `INSERT INTO Users (first_name,last_name) VALUES ('${name}', '${surname}');`,
      [],
      function (err) {
        if (!err) {
          const userid = this.lastID;
          let insertWishes =
            'INSERT INTO Wishes (userid,wish_number,wish_text) VALUES';
          const valuesWishes = [];
          for (let i = 0; i < wishes.length; i += 1) {
            valuesWishes.push(` (${userid}, ${i}, '${wishes[i]}')`);
          }
          insertWishes += valuesWishes.join(',');
          db.run(insertWishes, function (error) {
            if (!error) {
              send(`${userid}`);
            }
          });
        }
      }
    );
  };
}

const userModel = new UserSchema(santaDB);
export default userModel;

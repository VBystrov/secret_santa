import sqlite3 from 'sqlite3';

sqlite3.verbose();

const santaDB = new sqlite3.Database(':memory:');
santaDB.run(
  `CREATE TABLE Users (
    userid INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL)`
);

santaDB.run(
  `CREATE TABLE Wishes (
    wishid INTEGER PRIMARY KEY,
	wish_text TEXT NOT NULL,
	wish_number INTEGER NOT NULL,
	userid INTEGER NOT NULL,
	FOREIGN KEY (userid) REFERENCES Users(userid) )`
);

export default santaDB;

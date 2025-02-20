const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('plants.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS plants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        perennial BOOLEAN NOT NULL,
        category TEXT CHECK(category IN ('virág', 'bokor', 'fa')) NOT NULL,
        price INTEGER CHECK(price >= 0) NOT NULL
    )`);
});

module.exports = db;

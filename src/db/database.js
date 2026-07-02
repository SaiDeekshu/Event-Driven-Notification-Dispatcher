const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'events.db'));

db.serialize(() => {
  const schema = require('fs').readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
});

module.exports = db;

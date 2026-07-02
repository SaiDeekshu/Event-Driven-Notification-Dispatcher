const db = require('../db/database');
const notificationService = require('./notificationService');

exports.handleEvent = (event_type, recipient, data) => {

  return new Promise((resolve, reject) => {

    db.run(

      `INSERT INTO events (event_type, recipient, data)
       VALUES (?, ?, ?)`,

      [event_type, recipient, JSON.stringify(data)],

      function (err) {

        if (err) return reject(err);

        const event_id = this.lastID;

        console.log("event_id:", event_id);

        notificationService
          .createNotification(event_id, recipient)
          .then(resolve)
          .catch(reject);

      }

    );

  });

};
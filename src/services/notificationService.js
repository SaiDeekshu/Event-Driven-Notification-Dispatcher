const db = require('../db/database');
const queueWorker = require('./queueWorker');

exports.createNotification = (event_id, recipient) => {

  return new Promise((resolve, reject) => {

    const channel = "email";

    db.run(

      `INSERT INTO notifications
      (event_id, channel, status, retry_count, tracking_id)
      VALUES (?, ?, 'pending', 0, ?)`,

      [event_id, channel, event_id],

      function (err) {

        if (err) return reject(err);

        const notification_id = this.lastID;

        const tracking_id = event_id;

        console.log("notification_id:", notification_id);
        console.log("tracking_id:", tracking_id);
        console.log("channel:", channel);

        queueWorker.pushTask({
          notification_id,
          event_id,
          recipient
        });

        resolve({
          tracking_id,
          notification_id
        });

      }

    );

  });

};
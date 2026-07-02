const db = require('../db/database');

let queue = [];

function processQueue() {

  if (queue.length === 0) return;

  const task = queue.shift();

  console.log("--------------------------------");
  console.log("Task Picked From Queue");
  console.log(task);

  const delay = Math.floor(Math.random() * 500) + 500;

  console.log("Random Delay:", delay, "ms");

  setTimeout(() => {

    console.log("Notification Sending Started");

    const success = Math.random() > 0.1;

    const status = success ? "completed" : "failed";

    console.log("status:", status);

    console.log("retry_count:", success ? 0 : 1);

    db.run(

      `UPDATE notifications
       SET status = ?,
           retry_count = retry_count + ?
       WHERE notification_id = ?`,

      [status, success ? 0 : 1, task.notification_id],

      (err) => {

        if (err) {

          console.error("Notification Update Failed");

          console.error(err);

        }

        else {

          console.log(
            `Notification ${task.notification_id} ${status}`
          );

          console.log("Notification Sending Finished");

          console.log("--------------------------------");

        }

      }

    );

  }, delay);

}

setInterval(processQueue, 1000);

exports.pushTask = (task) => {

  console.log("Task Added To Queue");

  console.log(task);

  queue.push(task);

  console.log("Queue Length:", queue.length);

};
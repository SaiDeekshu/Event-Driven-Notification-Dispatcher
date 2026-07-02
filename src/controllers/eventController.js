const eventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
  try {
    const { event_type, recipient, data } = req.body;

    // Required Variables
    console.log("==================================");
    console.log("New Request Received");
    console.log("event_type:", event_type);
    console.log("recipient:", recipient);
    console.log("data:", data);
    console.log("==================================");

    if (!event_type || !recipient) {
      return res.status(400).json({
        error: "event_type and recipient are required"
      });
    }

    const result = await eventService.handleEvent(
      event_type,
      recipient,
      data
    );

    return res.status(202).json({
      message: "Event accepted for processing",
      tracking_id: result.tracking_id,
      notification_id: result.notification_id,
      status: "pending"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
# Event-Driven-Notification-Dispatcher

# Event-Driven Notification Dispatcher

## Project Overview

The Event-Driven Notification Dispatcher is a lightweight asynchronous notification system built using **Node.js**, **Express.js**, and **SQLite**.

The application exposes a REST API that accepts business events (such as `order_placed`). When an event is received, it is stored in the SQLite database, a notification task is created and added to an in-memory queue, and the API immediately returns a **202 Accepted** response. The notification is then processed asynchronously in the background without blocking the client request.

---

# Tech Stack Used

- **Backend Framework:** Express.js
- **Runtime:** Node.js
- **Database:** SQLite
- **SQLite Package:** sqlite3
- **Queue Mechanism:** Native JavaScript In-Memory Queue
- **API Testing:** Thunder Client / Postman

---

# How to Install Dependencies

Clone the repository:

```bash
git clone <your-github-repository-link>
```

Navigate to the project folder:

```bash
cd Event
```

Install the required packages:

```bash
npm install
```

---

# How to Set Up the SQLite Database

The application automatically creates the SQLite database when the server starts.

The database schema is loaded from:

```
src/db/schema.sql
```

The following tables are created automatically:

- `events`
- `notifications`

The SQLite database file is:

```
events.db
```

No additional database setup is required.

---

# How to Run the Application

Start the application:

```bash
npm start
```

or run in development mode:

```bash
npm run dev
```

The server will start on:

```
http://localhost:3000
```

---

# API Endpoint Details

### Endpoint

```
POST /api/v1/events
```

### Full URL

```
http://localhost:3000/api/v1/events
```

### Purpose

This endpoint receives a business event, stores it in the database, creates a pending notification, pushes it into an in-memory queue, and immediately returns a **202 Accepted** response while the notification is processed asynchronously.

---

# Sample Request Body

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

---

# Sample Response Body

**Status Code**

```
202 Accepted
```

**Response**

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

---

# How the Asynchronous Queue Works

The application follows an event-driven asynchronous workflow:

1. The client sends a **POST** request to `/api/v1/events`.
2. The request is validated.
3. The event is stored in the **events** table.
4. A notification record is created in the **notifications** table with the status **pending**.
5. The notification task is added to an **in-memory queue**.
6. The API immediately returns a **202 Accepted** response without waiting for notification processing.
7. A background worker continuously monitors the queue.
8. The worker picks the next notification task from the queue.
9. Notification sending is simulated using `setTimeout()` with a random delay between **500 ms and 1000 ms**.
10. A **10% failure rate** is simulated.
11. The notification status is updated to:
    - `completed`
    - or `failed`
12. If the notification fails, the `retry_count` is incremented in the database.

This asynchronous architecture ensures that the client receives a quick response while notification processing occurs independently in the background.

# 🚀 Event-Driven Notification Dispatcher

A lightweight **asynchronous notification system** built using **Node.js**, **Express.js**, and **SQLite**. The application accepts business events through a REST API, stores them in a SQLite database, creates notification tasks, pushes them into an in-memory queue, and processes them asynchronously in the background while immediately responding to the client.

---

# 📌 Project Overview

The Event-Driven Notification Dispatcher demonstrates an **event-driven architecture** where incoming business events are processed asynchronously.

When an event is received:

- ✅ Validates the incoming request
- ✅ Stores the event in the SQLite database
- ✅ Creates a notification record with **pending** status
- ✅ Pushes the notification into an in-memory queue
- ✅ Immediately returns **202 Accepted**
- ✅ Processes notifications asynchronously in the background
- ✅ Updates the notification status as **completed** or **failed**

---

# 🛠️ Tech Stack Used

| Technology | Purpose |
|------------|---------|
| 🟢 Node.js | JavaScript Runtime |
| ⚡ Express.js | Backend Framework |
| 🗄️ SQLite | Lightweight Database |
| 📦 sqlite3 | SQLite Driver |
| 🔄 Native JavaScript Queue | Background Queue Processing |
| ⏱️ setTimeout() | Simulated Notification Sending |
| 🧪 Thunder Client / Postman | API Testing |

---

# 📥 How to Install Dependencies

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repository-link>
```

### 2️⃣ Navigate to the Project

```bash
cd Event
```

### 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🗄️ How to Set Up the SQLite Database

No manual database setup is required.

When the application starts:

- ✅ SQLite database is automatically created
- ✅ Tables are automatically initialized using:

```
src/db/schema.sql
```

Database File:

```
events.db
```

Tables Created:

- **events**
- **notifications**

---

# ▶️ How to Run the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server starts on:

```
http://localhost:3000
```

---

# 🌐 API Endpoint Details

### Endpoint

```http
POST /api/v1/events
```

### Full URL

```
http://localhost:3000/api/v1/events
```

### Purpose

Accepts a business event, stores it in the database, creates a notification task, pushes it into the queue, and immediately returns **202 Accepted** while the notification is processed asynchronously.

---

# 📤 Sample Request Body

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

# 📥 Sample Response Body

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

# 🔄 How the Asynchronous Queue Works

The application follows an **event-driven asynchronous workflow**.

### Workflow

1. 📩 Client sends a **POST** request.
2. ✅ Request is validated.
3. 🗄️ Event is stored in the **events** table.
4. 📧 Notification record is created with **pending** status.
5. 📥 Notification task is pushed into the in-memory queue.
6. ⚡ API immediately returns **202 Accepted**.
7. 🔄 Background worker continuously monitors the queue.
8. 📤 Worker picks the next notification task.
9. ⏱️ Notification sending is simulated using **setTimeout()** with a random delay between **500 ms and 1000 ms**.
10. 🎲 A **10% failure rate** is simulated.
11. 📊 Notification status is updated to:
    - ✅ completed
    - ❌ failed
12. 🔁 If failed, **retry_count** is incremented.

This architecture ensures the client receives a fast response while notification processing continues independently in the background.

---

# 📌 Assumptions

- 📧 Notification channel is fixed as **email**.
- 🗄️ SQLite is used as the local database.
- 🔄 Queue is maintained entirely in memory.
- ⏱️ Notification sending is simulated using **setTimeout()**.
- 🆔 `tracking_id` is mapped to the corresponding `event_id`.
- 👤 Each request contains a valid recipient email.
- 🚀 Only one notification channel (**email**) is implemented.

---

# ⚠️ Limitations

- ❌ In-memory queue data is lost if the server restarts.
- ❌ Notification sending is simulated and does not send real emails.
- ❌ Retry mechanism only increments **retry_count**; automatic retries are not implemented.
- ❌ No authentication or authorization.
- ❌ No external message broker (Redis, RabbitMQ, Kafka, etc.).
- ❌ Designed for demonstration and local development purposes.

---

# ✅ Expected Workflow

```text
Client
   │
   ▼
POST /api/v1/events
   │
   ▼
Validate Request
   │
   ▼
Store Event in SQLite
   │
   ▼
Create Pending Notification
   │
   ▼
Push Task to Queue
   │
   ├──────────────► Return 202 Accepted
   │
   ▼
Background Queue Worker
   │
   ▼
setTimeout()
   │
   ▼
Random Delay (500–1000 ms)
   │
   ▼
10% Failure Simulation
   │
   ▼
Update Notification Status
   │
   ├──► completed
   └──► failed
            │
            ▼
Increment retry_count (on failure)
```

---

# 👨‍💻 Author

**Backend Engineering Assessment Submission**

**Developed Using**

- 🟢 Node.js
- ⚡ Express.js
- 🗄️ SQLite
- 📦 sqlite3
- 🔄 Native JavaScript Queue

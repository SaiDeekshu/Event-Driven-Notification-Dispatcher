CREATE TABLE IF NOT EXISTS events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  data TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER,
  channel TEXT DEFAULT 'email',
  status TEXT DEFAULT 'pending',
  retry_count INTEGER DEFAULT 0,
  tracking_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(event_id) REFERENCES events(event_id)
);

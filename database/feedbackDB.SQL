-- 1. Users
CREATE TABLE users (
    id          BIGINT         AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    role        ENUM('admin','manager','staff') NOT NULL,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Locations
CREATE TABLE locations (
    id          BIGINT         AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    address     TEXT,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Feedbacks
CREATE TABLE feedbacks (
    id            BIGINT         AUTO_INCREMENT PRIMARY KEY,
    location_id   BIGINT         NOT NULL,
    sentiment     ENUM('positive','neutral','negative') NOT NULL,
    rating        INT,
    message       TEXT,
    image_url     TEXT,
    voice_url     TEXT,
    submitted_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status        ENUM('pending','responded','resolved') NOT NULL,
    CONSTRAINT fk_feedbacks_location
        FOREIGN KEY (location_id) REFERENCES locations(id)
) ENGINE=InnoDB;

-- 4. Responses
CREATE TABLE responses (
    id            BIGINT         AUTO_INCREMENT PRIMARY KEY,
    feedback_id   BIGINT         NOT NULL,
    user_id       BIGINT         NOT NULL,
    response      TEXT,
    responded_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    follow_up     BOOLEAN        NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_responses_feedback
        FOREIGN KEY (feedback_id) REFERENCES feedbacks(id),
    CONSTRAINT fk_responses_user
        FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 5. Alerts
CREATE TABLE alerts (
    id             BIGINT         AUTO_INCREMENT PRIMARY KEY,
    feedback_id    BIGINT         NOT NULL,
    triggered_by   VARCHAR(50),
    escalated_to   BIGINT,
    resolved_at    TIMESTAMP,
    CONSTRAINT fk_alerts_feedback
        FOREIGN KEY (feedback_id) REFERENCES feedbacks(id),
    CONSTRAINT fk_alerts_escalated
        FOREIGN KEY (escalated_to) REFERENCES users(id)
) ENGINE=InnoDB;

-- 6. Feedback Stats (one row per date+sentiment)
CREATE TABLE feedback_stats (
    id      BIGINT         AUTO_INCREMENT PRIMARY KEY,
    date    DATE           NOT NULL,
    total   INT,
    status  ENUM('positive','neutral','negative') NOT NULL,
    CONSTRAINT fk_stats_sentiment
        FOREIGN KEY (status) REFERENCES feedbacks(sentiment)
) ENGINE=InnoDB;

-- 7. Indexes for frequently queried columns
CREATE INDEX idx_feedbacks_location  ON feedbacks(location_id);
CREATE INDEX idx_feedbacks_sentiment ON feedbacks(sentiment);
CREATE INDEX idx_feedbacks_status    ON feedbacks(status);
CREATE INDEX idx_responses_feedback  ON responses(feedback_id);
CREATE INDEX idx_alerts_feedback     ON alerts(feedback_id);
CREATE INDEX idx_alerts_escalated    ON alerts(escalated_to);

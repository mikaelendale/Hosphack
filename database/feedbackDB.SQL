erDiagram
    users ||--o{ responses : "writes"
    locations ||--o{ feedbacks : "has"
    feedbacks ||--o{ responses : "has"
    feedbacks ||--o{ alerts : "triggers"
    
    users {
        bigint id PK "PRIMARY KEY"
        varchar name "255"
        varchar email "255"
        varchar password "255"
        enum role "admin, manager, staff"
        timestamp created_at
        timestamp updated_at
    }
    
    locations {
        bigint id PK "PRIMARY KEY"
        varchar name "255"
        text address
        timestamp created_at
        timestamp updated_at
    }
    
    feedbacks {
        bigint id PK "PRIMARY KEY"
        bigint location_id FK "REFERENCES locations(id)"
        enum sentiment "positive, neutral, negative"
        int rating
        text message
        text image_url
        text voice_url
        timestamp submitted_at
        enum status "pending, responded, resolved"
    }
    
    responses {
        bigint id PK "PRIMARY KEY"
        bigint feedback_id FK "REFERENCES feedbacks(id)"
        bigint user_id FK "REFERENCES users(id)"
        text response
        timestamp responded_at
        boolean follow_up
    }
    
    alerts {
        bigint id PK "PRIMARY KEY"
        bigint feedback_id FK "REFERENCES feedbacks(id)"
        varchar triggered_by "50"
        bigint escalated_to FK "REFERENCES users(id)"
        timestamp resolved_at
    }
    
    feedback_stats {
        bigint id PK "PRIMARY KEY"
        date date
        int total
        int positive
        int negative
        int neutral
    }




-- Create indexes for frequently queried columns
CREATE INDEX idx_feedbacks_location ON feedbacks(location_id);
CREATE INDEX idx_feedbacks_sentiment ON feedbacks(sentiment);
CREATE INDEX idx_feedbacks_status ON feedbacks(status);
CREATE INDEX idx_responses_feedback ON responses(feedback_id);
CREATE INDEX idx_alerts_feedback ON alerts(feedback_id);
CREATE INDEX idx_alerts_escalated ON alerts(escalated_to);

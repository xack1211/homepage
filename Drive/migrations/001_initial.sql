-- Create tables for users, providers, and oauth tokens
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE providers (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    options JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oauth_tokens (
    provider_id VARCHAR(255) REFERENCES providers(id) ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expiry_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (provider_id)
);

-- Index for looking up providers by type
CREATE INDEX idx_providers_type ON providers(type);

-- Default admin user (password: change-me-first)
INSERT INTO users (username, password_hash, is_admin) 
VALUES ('admin', '$2a$10$JdvG8D2gKwqGQ/uSzY5BYeSgzJlUl9Pi.ZY4WS8JOPVdxN9K852Se', true);

-- Example local provider
    INSERT INTO providers (id, name, type, options) 
    VALUES ('local1', 'Local Files', 'local', '{"root": "./files"}');
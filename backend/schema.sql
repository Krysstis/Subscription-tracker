CREATE DATABASE IF NOT EXISTS subscription_tracker
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE subscription_tracker;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category ENUM('Streaming', 'Music', 'Productivity', 'Gaming', 'Fitness', 'Other') NOT NULL DEFAULT 'Other',
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    billing_cycle ENUM('weekly', 'monthly', 'yearly') NOT NULL DEFAULT 'monthly',
    next_payment_date DATE NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

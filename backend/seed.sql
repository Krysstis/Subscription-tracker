USE subscription_tracker;

INSERT INTO users (email, password_hash) VALUES
('test@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO subscriptions (user_id, name, category, price, currency, billing_cycle, next_payment_date, is_active, notes) VALUES
(1, 'Netflix', 'Streaming', 15.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 5 DAY), 1, 'Family plan'),
(1, 'Spotify', 'Music', 9.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 12 DAY), 1, NULL),
(1, 'Prime Video', 'Streaming', 8.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, NULL),
(1, 'HBO Max', 'Streaming', 9.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 18 DAY), 1, NULL),
(1, 'Gym+', 'Fitness', 12.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 1, 'Annual membership'),
(1, 'Notion', 'Productivity', 8.00, 'USD', 'monthly', DATE_ADD(CURDATE(), INTERVAL 22 DAY), 1, NULL),
(1, 'YouTube Premium', 'Streaming', 11.99, 'EUR', 'monthly', DATE_ADD(CURDATE(), INTERVAL 9 DAY), 0, 'Paused');

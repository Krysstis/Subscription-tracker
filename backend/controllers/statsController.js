const pool = require('../config/database');

async function getStats(req, res) {
    const userId = req.user.id;
    const currency = req.query.currency || 'EUR';

    try {
        const [totals] = await pool.query(
            `SELECT
                COUNT(*) AS total,
                SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active,
                SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive
            FROM subscriptions
            WHERE user_id = ?`,
            [userId]
        );

        const [monthly] = await pool.query(
            `SELECT
                SUM(CASE
                    WHEN billing_cycle = 'monthly' THEN price
                    WHEN billing_cycle = 'yearly' THEN price / 12
                    WHEN billing_cycle = 'weekly' THEN price * 4.33
                END) AS monthly_total
            FROM subscriptions
            WHERE user_id = ? AND is_active = 1 AND currency = ?`,
            [userId, currency]
        );

        const [byCategory] = await pool.query(
            `SELECT category, COUNT(*) AS count, SUM(price) AS total_price
            FROM subscriptions
            WHERE user_id = ? AND is_active = 1
            GROUP BY category`,
            [userId]
        );

        res.json({
            total: totals[0].total,
            active: totals[0].active,
            inactive: totals[0].inactive,
            monthly_cost: parseFloat(monthly[0].monthly_total || 0).toFixed(2),
            currency,
            by_category: byCategory
        });
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function upcoming(req, res) {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 7;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM subscriptions WHERE user_id = ? AND is_active = 1 AND next_payment_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL ? DAY) ORDER BY next_payment_date ASC',
            [userId, days]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

module.exports = { getStats, upcoming };

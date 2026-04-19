const pool = require('../config/database');

async function getStats(req, res) {
    res.json({ message: 'Bus papildyta Žingsnis 5' });
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

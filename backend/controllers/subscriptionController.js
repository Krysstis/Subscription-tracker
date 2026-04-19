const { validationResult } = require('express-validator');
const pool = require('../config/database');

async function getAll(req, res) {
    const userId = req.user.id;
    const { category, active, sort } = req.query;

    let query = 'SELECT * FROM subscriptions WHERE user_id = ?';
    const params = [userId];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (active !== undefined) {
        query += ' AND is_active = ?';
        params.push(active === 'true' ? 1 : 0);
    }

    const allowedSort = ['name', 'price', 'next_payment_date', 'created_at'];
    if (sort && allowedSort.includes(sort)) {
        query += ` ORDER BY ${sort} ASC`;
    } else {
        query += ' ORDER BY created_at DESC';
    }

    try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function getOne(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM subscriptions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Prenumerata nerasta' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { name, category, price, currency, billing_cycle, next_payment_date, notes } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO subscriptions (user_id, name, category, price, currency, billing_cycle, next_payment_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, name, category, price, currency || 'EUR', billing_cycle, next_payment_date, notes || null]
        );

        const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { name, category, price, currency, billing_cycle, next_payment_date, is_active, notes } = req.body;

    try {
        const [existing] = await pool.query(
            'SELECT id FROM subscriptions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Prenumerata nerasta' });
        }

        await pool.query(
            'UPDATE subscriptions SET name = ?, category = ?, price = ?, currency = ?, billing_cycle = ?, next_payment_date = ?, is_active = ?, notes = ? WHERE id = ? AND user_id = ?',
            [name, category, price, currency, billing_cycle, next_payment_date, is_active, notes || null, id, userId]
        );

        const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function patch(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const [existing] = await pool.query(
            'SELECT * FROM subscriptions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Prenumerata nerasta' });
        }

        const allowed = ['name', 'category', 'price', 'currency', 'billing_cycle', 'next_payment_date', 'is_active', 'notes'];
        const fields = [];
        const values = [];

        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(req.body[key]);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({ error: 'Nėra ką atnaujinti' });
        }

        values.push(id, userId);
        await pool.query(
            `UPDATE subscriptions SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
            values
        );

        const [rows] = await pool.query('SELECT * FROM subscriptions WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

async function remove(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const [existing] = await pool.query(
            'SELECT id FROM subscriptions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Prenumerata nerasta' });
        }

        await pool.query('DELETE FROM subscriptions WHERE id = ? AND user_id = ?', [id, userId]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Serverio klaida' });
    }
}

module.exports = { getAll, getOne, create, update, patch, remove };

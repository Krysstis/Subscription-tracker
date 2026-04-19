require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - vykdomi prieš kiekvieną užklausą
app.use(cors({
    origin: 'http://127.0.0.1:5500' // frontend adresas
}));
app.use(express.json()); // kad galėtume skaityti JSON body
app.use(morgan('dev'));  // logina užklausas į konsolę

// Testavimo endpoint'as
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server veikia' });
});

// Routes (kol kas tušti, pridėsim vėliau)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/subscriptions', require('./routes/subscriptions'));
// app.use('/api/stats', require('./routes/stats'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nerastas' });
});

// Paleidžiam serverį
app.listen(PORT, () => {
    console.log(`Serveris veikia: http://localhost:${PORT}`);
});

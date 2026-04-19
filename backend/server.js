require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server veikia' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/stats', require('./routes/stats'));

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nerastas' });
});

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Serveris veikia: https://localhost:${PORT}`);
});

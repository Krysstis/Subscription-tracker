require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

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

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint nerastas' });
});

app.listen(PORT, () => {
    console.log(`Serveris veikia: http://localhost:${PORT}`);
});

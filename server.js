// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Routes - Define these BEFORE static file serving
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files AFTER routes
app.use(express.static(path.join(__dirname, 'public')));

// Serve JSON data
app.get('/data/planets', (req, res) => {
    fs.readFile('./data/space-data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to load data' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Simple login check (password: "space123")
const users = {
    "astro@cosmos.com": "$2b$10$q1xg5uLzwH1C6wogPVZQ4eSqnQEJqUX95Epu6DzswqXGeamgj.3jK" // hashed version
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Add logging
    const hashed = users[email];
    if (!hashed) return res.status(401).json({ error: 'Invalid credentials' });

    try {
        const result = await bcrypt.compare(password, hashed);
        console.log('Password comparison result:', result); // Add logging
        if (result) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

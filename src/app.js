const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
});


//this is a modification comment
app.get('/demo', (_req, res) => {
    res.status(200).json({ demo: true });
});


app.post('/students', (req, res) => {
    const name = req.body?.name;
    if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            error: 'name requis',
        });
    }

    return res.status(201).json({
        name: name.trim(),
    });
});

app.use((_req, res) => {
    res.status(404).json({
        error: 'unknown route',
    });
});

module.exports = app;

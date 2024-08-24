const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET all posts
app.get('/posts', (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

// GET a specific post by ID
app.get('/posts/:id', (req, res) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({ "message": "success", "data": row });
    });
});

// POST a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    const params = [title, content];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({ "message": "success", "data": { id: this.lastID } });
    });
});

// PUT (update) a post by ID
app.put('/posts/:id', (req, res) => {
    const { title, content } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    const params = [title, content, req.params.id];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({ "message": "success", "changes": this.changes });
    });
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    const params = [req.params.id];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({ "message": "deleted", "changes": this.changes });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

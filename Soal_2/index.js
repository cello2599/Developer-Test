const express = require('express');
const bodyParser = require('body-parser');

// Import the database connection
const db = require('./connection');

//respon
const response = require('./respon');

const app = express();
app.use(bodyParser.json()); // Parse JSON data


// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API Routes

// 1. POST: Menambahkan user baru
app.post('/users', (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return response(400, 'error, semua data harus diisi', null, res);
    }
    
    // Check untuk email yang sudah terdaftar
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            // return res.status(400).send({ message: 'Email telah ada' });
            return response(400, 'Email telah ada', null, res);
        }

        // Insert user
        const insertQuery = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ? ,?)';
        db.query(insertQuery, [name, username, email, password], (err, result) => {
            if (err) return res.status(500).send(err);
            return response(201, 'User berhasil ditambahkan', result.insertId, res);
        });
    });
});

// 2. GET: Menampilkan semua user
app.get('/users', (req, res) => {
    const selectQuery = 'SELECT * FROM users';
    db.query(selectQuery, (err, results) => {
        if (err) return res.status(500).send(err);
        return response(200, 'Menampilkan data semua user', results, res);
    });
});

// 3. GET: Menampilkan user berdasarkan ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const selectQuery = 'SELECT * FROM users WHERE id = ?';
    db.query(selectQuery, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) {
            return response(404, 'User tidak ditemukan', null, res);
        }
        return response(200, 'data user '+result[0].name, result[0], res);
    });
});

// 4. DELETE: menghapus user berdasarkan ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const deleteQuery = 'DELETE FROM users WHERE id = ?';
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) {
            return response(404, 'User tidak ditemukan', null, res);
        }
        return response(200, 'User berhasil dihapus', null, res);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

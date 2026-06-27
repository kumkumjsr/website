const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kumkum', // Your MySQL password
    database: 'quizz_app'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.stack);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// --- 1. USER REGISTRATION ---
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password, score) VALUES (?, ?, 0)";
    
    db.query(sql, [username, password], (err) => {
        if (err) {
            console.error("Register Error:", err);
            return res.status(400).json({ success: false, message: "User already exists!" });
        }
        res.json({ success: true, message: "Registered Successfully!" });
    });
});

// --- 2. USER LOGIN ---
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Database Error" });

        if (results.length > 0) {
            res.json({ 
                success: true, 
                message: "Login Successful!", 
                username: results[0].username 
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    });
});

// --- 3. SAVE SCORE (High Score Logic) ---
router.post('/save-score', (req, res) => {
    const { username, score } = req.body;

    // We use GREATEST to only update if the new score is higher
    // We also update last_test_date to the current time
    const sql = `
        UPDATE users 
        SET score = GREATEST(COALESCE(score, 0), ?), 
            last_test_date = NOW() 
        WHERE username = ?`;

    db.query(sql, [score, username], (err, result) => {
        if (err) {
            console.error("Save Score Error:", err);
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json({ success: true, message: "Score updated successfully!" });
    });
});

// --- 4. LEADERBOARD (Fetch Past & Present Users) ---
router.get('/leaderboard', (req, res) => {
    // 1. We use COALESCE to turn NULL scores into 0
    // 2. We calculate percentage (score / 15 * 100)
    // 3. We sort by highest score first
    const sql = `
        SELECT 
            username, 
            COALESCE(score, 0) AS score, 
            COALESCE(last_test_date, NOW()) AS last_test_date,
            ROUND((COALESCE(score, 0) / 15) * 100, 1) AS percentage 
        FROM users 
        ORDER BY score DESC, last_test_date DESC 
        LIMIT 10`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Leaderboard SQL Error:", err);
            return res.status(500).json({ success: false, message: "Database Error" });
        }
        res.json(results);
    });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes'); // Ensure routes.js is in the same folder

const app = express();

// 1. Enable CORS (This fixes the "Unable to load data" error)
app.use(cors());

// 2. Parse JSON bodies
app.use(bodyParser.json());

// 3. Serve your HTML files
// This assumes your HTML files are in the parent folder or the same folder.
// Adjust path.join(__dirname, './') if your HTML is inside a 'public' folder.
app.use(express.static(path.join(__dirname, './'))); 

// 4. Use the routes
app.use('/api', userRoutes);

// 5. Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying at http://localhost:${PORT}`);
    console.log(`📊 Check leaderboard data at: http://localhost:3000/api/leaderboard`);
});
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sequelize = require('./config/db');
const songRoutes = require('./routes/songRoutes');
require('dotenv').config();

const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Use routes
app.use('/api', songRoutes(upload)); // Pass upload middleware to routes

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log('Error: ' + err));

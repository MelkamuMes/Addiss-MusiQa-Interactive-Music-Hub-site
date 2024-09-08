const express = require('express');
const { getSongs, addSong, updateSong, deleteSong , searchSong } = require('../controllers/songController');

const songRoutes = (upload) => {
    const router = express.Router();

    router.get('/songs', getSongs);
    router.post('/songs', upload.single('audio'), addSong);  // Handle file upload
    router.put('/songs/:id', upload.single('audio'), updateSong);  // Handle file upload
    router.delete('/songs/:id', deleteSong);
    router.get('/songs/search', searchSong); // Search route

    return router;
};

module.exports = songRoutes;


//!Updated
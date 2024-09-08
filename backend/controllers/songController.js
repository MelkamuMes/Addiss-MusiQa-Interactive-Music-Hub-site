const Song = require('../models/song');

// Get all songs
const getSongs = async (req, res) => {
    try {
        const songs = await Song.findAll();
        console.log(songs)
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// !Updated add and updaate file methods are Starting
// Add a new song
const addSong = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, artist } = req.body;
        // const audioUrl = `/uploads/${req.file.filename}`; // Correct path for the audio file
        const audioUrl = req.file.filename; // Correct path for the audio file

        const newSong = await Song.create({ title, artist, audioUrl });
        res.status(201).json(newSong);
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update an existing song
const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist } = req.body;
        const audioUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Update URL if file is provided

        const song = await Song.findByPk(id);

        if (song) {
            song.title = title || song.title;
            song.artist = artist || song.artist;
            if (audioUrl) song.audioUrl = audioUrl;

            await song.save();
            res.status(200).json(song);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).json({ message: error.message });
    }
};

// !Updated add and updaate file methods are Ending

// Delete a song
const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByPk(id);

        if (song) {
            await song.destroy();
            res.status(200).json({ message: 'Song deleted' });
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSongs, addSong, updateSong, deleteSong };

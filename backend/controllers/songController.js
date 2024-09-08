const Song = require('../models/song');

// Get all songs
const getSongs = async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new song
const addSong = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, artist } = req.body;
        const audioUrl = req.file.filename; // Correct path for the audio file

        const newSong = await Song.create({ title, artist, audioUrl });
        res.status(201).json(newSong);
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ message: error.message });
    }
};

// Search song by ID, name, or title
const searchSong = async (req, res) => {
    const { query } = req.query;
    try {
        const songs = await Song.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { artist: { [Op.iLike]: `%${query}%` } },
                    { id: query },
                ],
            },
        });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error searching songs' });
    }
};

// Update an existing song
const updateSong = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSong = await Song.update(req.body, { where: { id }, returning: true });
        res.json(updatedSong[1][0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating song' });
    }
};

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

module.exports = { getSongs, addSong, updateSong, deleteSong, searchSong };

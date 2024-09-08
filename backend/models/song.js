const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Song = sequelize.define('Song', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    audioUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

module.exports = Song;

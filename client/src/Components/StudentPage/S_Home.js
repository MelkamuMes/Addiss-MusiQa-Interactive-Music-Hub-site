// !Updated on serachbar
import React, { useState, useEffect } from 'react';
import './StudentPage.css';
import axios from 'axios';
import SearchIcon from '../img/icons8-music-search-100.png';
// todo adding a loader for search lists

function S_Home() {
  const [songs, setSongs] = useState([]);  // State to store all songs
  const [searchTerm, setSearchTerm] = useState('');  // State to store search term
  const [filteredSongs, setFilteredSongs] = useState([]);  // State for filtered songs
  const [playingSongId, setPlayingSongId] = useState(null);  // State for the currently playing song


  // Fetch songs from backend API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/songs');
        setSongs(response.data);  // Store all songs in state
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  // Filter songs by search term (artist name or song title)
  useEffect(() => {
    if (searchTerm) {
      const results = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(results);  // Update the filtered songs list
    } else {
      setFilteredSongs([]);  // Clear the filtered songs when search term is empty
    }
  }, [searchTerm, songs]);

  const handlePlay = (id) => {
    setPlayingSongId(id);  // Set the currently playing song id
  };

  return (
    <div>
      <div className='logo logoH'>
        <h1>ሙ</h1>
      </div>

      <div className='SHome_container'>
        <div className='outer'>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input 
              type='text' 
              placeholder='Browse your favourite songs here'
              value={searchTerm}  // Bind input to searchTerm state
              onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm on input change
            />
            <button type='submit'>
              <img src={SearchIcon} alt='Search Icon' />
            </button>
          </form>

          <div className='details'>
            <h1>Connect To Music World In Here</h1>
            <h3>MusiQa your favourite Music Site</h3>
          </div>
        </div>

        {/* Conditionally render song list only if searchTerm is not empty */}
        {searchTerm && (
          <div id="song-list-container">
            {filteredSongs.length > 0 ? (
              <ul className="ssong-list">
                {filteredSongs.map(song => (
                  <li key={song.id}>
                    <strong>{song.title}</strong> by {song.artist}
                    <audio controls  onPlay={() => handlePlay(song.id)}  onPause={() => handlePlay(null)}  style={{ display: playingSongId === song.id ? 'block' : 'none' }} className='audio-player'>
                      <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    {playingSongId !== song.id && (
                     <button onClick={() => handlePlay(song.id)} className='play-button'>Play</button>
                   )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No songs found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default S_Home;

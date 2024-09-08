import React, { useState, useEffect } from 'react';
import AudioPlayer from '../AudioPlayer'; // Adjust path if necessary
import axios from 'axios';

const PlaySongs = () => {
    const [songs, setSongs] = useState([]);  // State to store all songs
    // const [playingSongId, setPlayingSongId] = useState(null);  // State for the currently playing song
  
  
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

    return (
        <div className="PlaySong_container" style={{ textAlign: 'center' }}>
            {songs.length > 0 ? (
                <AudioPlayer songs={songs} initialIndex={0} />
            ) : (
                <p>Loading songs...</p>
            )}
            
        </div>
    );
};

// const play_container {
    
// }

export default PlaySongs;

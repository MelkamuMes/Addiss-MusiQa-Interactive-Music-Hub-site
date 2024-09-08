// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SongList = () => {
//     const [songs, setSongs] = useState([]);

//     useEffect(() => {
//         const fetchSongs = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/songs');
//                 setSongs(response.data);
//             } catch (error) {
//                 console.error('Error fetching songs:', error);
//             }
//         };
//         fetchSongs();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/songs/${id}`);
//             setSongs(songs.filter(song => song.id !== id));
//         } catch (error) {
//             console.error('Error deleting song:', error);
//         }
//     };

//     return (
//         <ul>
//             {songs.map(song => (
//                 <li key={song.id}>
//                     <span>{song.title} by {song.artist}</span>
//                     <audio controls>
//                     <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
//                     {/* <source src={`http://localhost:5000/${song.audioUrl}`} type="audio/mpeg" /> */}
//                         Your browser does not support the audio element.
//                     </audio>
//                     <button onClick={() => handleDelete(song.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default SongList;



// ! Updated with css

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from './img/icons8-delete-30.png'
import './SongList.css'; // Import your CSS file
import LoadingSpinner from './LoadingSpinner';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading
    const [playingSongId, setPlayingSongId] = useState(null);  // State for the currently playing song
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/songs');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongs();
    }, []);

    const handlePlay = (id) => {
        setPlayingSongId(id);  // Set the currently playing song id
      };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/songs/${id}`);
            setSongs(songs.filter(song => song.id !== id));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };


    if (loading) {
        return <LoadingSpinner />; // Show loading spinner while loading
    } 

    return (
        <div className="song-list-container">
            <ul className="song-list">
                {songs.map(song => (
                    <li key={song.id} className="song-item">
                        <div className="song-info">
                            <span className="song-title">{song.title} by {song.artist}</span>
                            <audio controls className="audio-player"  onPlay={() => handlePlay(song.id)} onPause={() => handlePlay(null)} style={{ display: playingSongId === song.id ? 'block' : 'none' }}>
                                <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        {playingSongId !== song.id && (
                        <button onClick={() => handlePlay(song.id)} className='play-button'>Play</button>
                        )}
                        <button onClick={() => handleDelete(song.id)} className="delete-button">
                            <img src={DeleteIcon} alt="DeleteIcon" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default SongList;

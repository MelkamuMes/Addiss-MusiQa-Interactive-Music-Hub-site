// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DeleteIcon from './img/icons8-delete-30.png';
// import './SongList.css'; // Import your CSS file
// import LoadingSpinner from './LoadingSpinner';
// import SongForm from './SongForm'; // Import the SongForm component

// const SongList = () => {
//     const [songs, setSongs] = useState([]);
//     const [loading, setLoading] = useState(false); // State to track loading
//     const [playingSongId, setPlayingSongId] = useState(null); // State for the currently playing song
//     const [selectedSong, setSelectedSong] = useState(null); // State for the song to be updated
//     const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle form visibility
//     const [isUpdateMode, setIsUpdateMode] = useState(false); // State to track add or update mode
//     const [notification, setNotification] = useState(''); // State for notifications

//     useEffect(() => {
//         const fetchSongs = async () => {
//             setLoading(true); // Start loading
//             try {
//                 const response = await axios.get('http://localhost:5000/api/songs');
//                 setSongs(response.data);
//             } catch (error) {
//                 console.error('Error fetching songs:', error);
//             } finally {
//                 setLoading(false); // End loading
//             }
//         };
//         fetchSongs();
//     }, []);

//     const handlePlay = (id) => {
//         setPlayingSongId(id); // Set the currently playing song id
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this song?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/songs/${id}`);
//                 setSongs(songs.filter(song => song.id !== id));
//                 setNotification('Song deleted successfully!');
//             } catch (error) {
//                 console.error('Error deleting song:', error);
//                 setNotification('Error deleting song.');
//             }
//         }
//     };

//     const handleAddClick = () => {
//         setSelectedSong(null); // Clear selection
//         setIsUpdateMode(false); // Set to add mode
//         setIsFormVisible(true); // Show the form
//     };

//     const handleUpdateClick = (song) => {
//         setSelectedSong(song); // Set the song to be updated
//         setIsUpdateMode(true); // Set to update mode
//         setIsFormVisible(true); // Show the form
//     };

//     const handleCloseForm = (success) => {
//         setIsFormVisible(false); // Hide the form
//         setSelectedSong(null); // Clear selection
//         if (success) {
//             setNotification(isUpdateMode ? 'Song updated successfully!' : 'Song added successfully!');
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />; // Show loading spinner while loading
//     }

//     return (
//         <div className="song-list-container">
//             {notification && <div className="notification">{notification}</div>}
//             {isFormVisible && (
//                 <SongForm
//                     selectedSong={selectedSong}
//                     isUpdateMode={isUpdateMode}
//                     onClose={handleCloseForm}
//                 />
//             )}
//             <button onClick={handleAddClick} className="add-button">Add Song</button>
//             <ul className="song-list">
//                 {songs.map(song => (
//                     <li key={song.id} className="song-item">
//                         <div className="song-info">
//                             <span className="song-title">{song.title} by {song.artist}</span>
//                             <audio controls className="audio-player" onPlay={() => handlePlay(song.id)} onPause={() => handlePlay(null)} style={{ display: playingSongId === song.id ? 'block' : 'none' }}>
//                                 <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                         </div>
//                         {playingSongId !== song.id && (
//                             <button onClick={() => handlePlay(song.id)} className='play-button'>Play</button>
//                         )}
//                         <button onClick={() => handleDelete(song.id)} className="delete-button">
//                             <img src={DeleteIcon} alt="DeleteIcon" />
//                         </button>
//                         <button onClick={() => handleUpdateClick(song)} className="update-button">Update</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SongList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, deleteSong } from '../features/slices/songSlice'; // Import actions
import DeleteIcon from './img/icons8-delete-30.png';
import './SongList.css';
import LoadingSpinner from './LoadingSpinner';
import SongForm from './SongForm';

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, loading, error, successMessage } = useSelector((state) => state.songs);
    const [playingSongId, setPlayingSongId] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [notification, setNotification] = useState('');

    // Fetch songs on component mount
    useEffect(() => {
        dispatch(fetchSongs());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            setNotification(successMessage);
            setTimeout(() => {
                setNotification('');
            }, 2000);
        }
    }, [successMessage]);

    const handlePlay = (id) => {
        setPlayingSongId(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this song?')) {
            dispatch(deleteSong(id));
            setNotification('Song deleted successfully!');
        }
    };

    const handleAddClick = () => {
        setSelectedSong(null);
        setIsUpdateMode(false);
        setIsFormVisible(true);
    };

    const handleUpdateClick = (song) => {
        setSelectedSong(song);
        setIsUpdateMode(true);
        setIsFormVisible(true);
    };

    const handleCloseForm = (success) => {
        setIsFormVisible(false);
        setSelectedSong(null);
        if (success) {
            setNotification(isUpdateMode ? 'Song updated successfully!' : 'Song added successfully!');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="song-list-container">
            {notification && <div className="notification">{notification}</div>}
            {error && <div className="error-message">{error}</div>}
            {isFormVisible && (
                <SongForm
                    selectedSong={selectedSong}
                    isUpdateMode={isUpdateMode}
                    onClose={handleCloseForm}
                />
            )}
            <button onClick={handleAddClick} className="add-button">Add Song</button>
            <ul className="song-list">
                {songs.map(song => (
                    <li key={song.id} className="song-item">
                        <div className="song-info">
                            <span className="song-title">{song.title} by {song.artist}</span>
                            <audio
                                controls
                                className="audio-player"
                                onPlay={() => handlePlay(song.id)}
                                onPause={() => handlePlay(null)}
                                style={{ display: playingSongId === song.id ? 'block' : 'none' }}
                            >
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
                        <button onClick={() => handleUpdateClick(song)} className="update-button">Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;

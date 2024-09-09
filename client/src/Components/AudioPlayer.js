/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from './img/icons8-delete-30.png';
import LoadingSpinner from './LoadingSpinner';
import SongForm from './SongForm';

const containerStyle = css`
  position: absolute;
  top: 10vh;
  width: 80%;
  left: 10vw;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
`;

const listStyle = css`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const itemStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const infoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const titleStyle = css`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const audioPlayerStyle = css`
  width: 100%;
  margin-top: 5px;
  transition: 2s;
`;

const buttonStyle = css`
  position: absolute;
  background-color: #009b93;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #007d75;
  }
`;

const playButtonStyle = css`
  left: 70%;
`;

const updateButtonStyle = css`
  left: 78%;
`;

const deleteButtonStyle = css`
  background-color: #c52e00;
`;

const addButtonStyle = css`
  background-color: #009b93;
`;

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/songs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handlePlay = (id) => {
    setPlayingSongId(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await axios.delete(`http://localhost:5000/api/songs/${id}`);
        setSongs(songs.filter(song => song.id !== id));
        setNotification('Song deleted successfully!');
      } catch (error) {
        console.error('Error deleting song:', error);
        setNotification('Error deleting song.');
      }
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
    <div css={containerStyle}>
      {notification && <div css={css`color: green;`}>{notification}</div>}
      {isFormVisible && (
        <SongForm
          selectedSong={selectedSong}
          isUpdateMode={isUpdateMode}
          onClose={handleCloseForm}
        />
      )}
      <button onClick={handleAddClick} css={addButtonStyle}>Add Song</button>
      <ul css={listStyle}>
        {songs.map(song => (
          <li key={song.id} css={itemStyle}>
            <div css={infoStyle}>
              <span css={titleStyle}>{song.title} by {song.artist}</span>
              <audio
                controls
                css={audioPlayerStyle}
                onPlay={() => handlePlay(song.id)}
                onPause={() => handlePlay(null)}
                style={{ display: playingSongId === song.id ? 'block' : 'none' }}
              >
                <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            {playingSongId !== song.id && (
              <button onClick={() => handlePlay(song.id)} css={[buttonStyle, playButtonStyle]}>Play</button>
            )}
            <button onClick={() => handleDelete(song.id)} css={[buttonStyle, deleteButtonStyle]}>
              <img src={DeleteIcon} alt="DeleteIcon" />
            </button>
            <button onClick={() => handleUpdateClick(song)} css={[buttonStyle, updateButtonStyle]}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;

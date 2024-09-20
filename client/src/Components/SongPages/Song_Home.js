/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import SearchIcon from '../img/icons8-music-search-100.png';

// Styled components
const Container = styled.div`
  position: absolute;
  display: inline-block;
  width: 70vw;
  height: 70%;
  left: 12.5vw;
  top: 4%;
`;

const Outer = styled.div`
  position: relative;
  left: 0%;
  right: 20%;
  top: 15vh;
  width: 100vw;
  height: 100vh;
  background: rgba(63, 63, 63, 0.267);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.form`
  width: 100vw;
  margin-right: 150px;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  border-radius: 60px;
  padding: 0px 40px;
  backdrop-filter: blur(4px) saturate(180%);
`;

const SearchInput = styled.input`
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 24px 20px;
  font-size: 20px;
  color: #1f1f1f;
  
  ::placeholder {
    color: #284f50b6;
    background: transparent;
  }
`;

const SearchButton = styled.button`
  border: 0;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: #58629b1c;
  backdrop-filter: blur(4px) saturate(180%);
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Details = styled.div`
  position: absolute;
  left: 45%;
  top: 20%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 4em;
    color: rgb(20, 32, 32);
  }

  h3 {
    text-transform: capitalize;
    color: #01a799;
  }
`;



const SongListContainer = styled.div`
  position: relative;
  top: -30vh;
  left: 20vw;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
  width: 50vw;
  background-color: #c9c9c9;
`;

const SongList = styled.ul`
  margin-top: 0px;
  margin-left: 30px;
  background-color: #a5a5a5;
  color: #007e5e;
  padding: 20px;
  list-style-type: none;
  padding: 0;
`;

const SongItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const AudioPlayer = styled.audio`
  margin-left: 60px;
  min-width: 400px;
`;

const PlayButton = styled.button`
  position: absolute;
  left: 70%;
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #00fff2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00b3aa;
  }

  &:active {
    background-color: #00948d;
  }
`;

function S_Home() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [playingSongId, setPlayingSongId] = useState(null);

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

  useEffect(() => {
    if (searchTerm) {
      const results = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(results);
    } else {
      setFilteredSongs([]);
    }
  }, [searchTerm, songs]);

  const handlePlay = (id) => {
    setPlayingSongId(id);
  };

  return (
    <div>


      <Container>
        <Outer>
          <SearchBar onSubmit={(e) => e.preventDefault()}>
            <SearchInput 
              type='text' 
              placeholder='Browse your favourite songs here'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type='submit'>
              <img src={SearchIcon} alt='Search Icon' />
            </SearchButton>
          </SearchBar>

          <Details>
            <h1>Connect To Music World In Here</h1>
            <h3>MusiQa your favourite Music Site</h3>
          </Details>
        </Outer>

        {searchTerm && (
          <SongListContainer>
            {filteredSongs.length > 0 ? (
              <SongList>
                {filteredSongs.map(song => (
                  <SongItem key={song.id}>
                    <strong>{song.title}</strong> by {song.artist}
                    <AudioPlayer
                      controls
                      onPlay={() => handlePlay(song.id)}
                      onPause={() => handlePlay(null)}
                      style={{ display: playingSongId === song.id ? 'block' : 'none' }}
                    >
                      <source src={`http://localhost:5000/uploads/${song.audioUrl}`} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </AudioPlayer>
                    {playingSongId !== song.id && (
                      <PlayButton onClick={() => handlePlay(song.id)}>Play</PlayButton>
                    )}
                  </SongItem>
                ))}
              </SongList>
            ) : (
              <p>No songs found</p>
            )}
          </SongListContainer>
        )}
      </Container>
    </div>
  );
}

export default S_Home;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import HomeIcon from '../img/icons8-home-page-30 (2).png';
import AddSongIcon from '../img/icons8-add-song-50.png';
import PlayListIcon from '../img/icons8-music-playlist-50.png';
import PlaySongs from '../img/icons8-google-play-music-50.png';
import LoginPopup from './LoginPopup';
// todo Adding a toggle for color theme 


function Header() {

  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleLogoutClick = () => {
    setLoginPopupOpen(true);
  };

  const handleCloseLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  return (

    <div>
       <LoginPopup
        isOpen={isLoginPopupOpen}
        onRequestClose={handleCloseLoginPopup}
      />
      <div className="Head">
       
        <div className='logo'>
          <h1>ሙ</h1>
        </div>
           <div className='nav'>               
                    <img src={PlaySongs} alt="PlaySongs" />
                    <Link to='/PlaySongs'>PlaySongs</Link>
           </div>
        
        <input value="Register" type="submit" onClick={handleLogoutClick} />
      </div>
      <div className='SideBar'>
        <nav>
          <ul>
            <li>
              <img src={HomeIcon} alt="Home" />
              <Link to='/'>Home</Link>
            </li>
            <li>
              <img src={AddSongIcon} alt="AddSongIcon" />
              <Link to='/AddSongs'>AddSongs</Link>
            </li>
            <li>
              <img src={PlayListIcon} alt="PlayListIcon" />
              <Link to='/playlist'>Playlist</Link>
            </li>
          </ul>
          <input value="change profile" type="submit" />
        </nav>
      </div>
    </div>
  );
}

export default Header;

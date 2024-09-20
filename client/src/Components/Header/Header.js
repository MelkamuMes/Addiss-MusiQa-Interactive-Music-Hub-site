/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import HomeIcon from '../img/icons8-home-page-30 (2).png';
import AddSongIcon from '../img/icons8-add-song-50.png';
import PlayListIcon from '../img/icons8-music-playlist-50.png';
import LogoIcon from '../img/Logo.png'
import PlaySongs from '../img/icons8-google-play-music-50.png';
import LoginPopup from './LoginPopup';

// Emotion styled components

const HeaderContainer = styled.div`
  border-bottom: 1px solid rgb(59, 248, 255);
  display: flex;
  height: 5vh;
  width: 100vw;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(27, 162, 167, 0.664);
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }
`;

const Logo = styled.div`
  width: 60px;
  height: 55px;
  border-radius: 50%;
  /* border: 1px solid rgb(59, 248, 255); */
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s;

  img {
    width: 75px;
    height: 75px;
  }

  &:hover {
    background-color: #fff;
    color: #00c8d6;
    /* border: 3px solid #00c8d6; */
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  background-color: #00c8d6;
  border-radius: 64px;
  padding: 0 15px;

  a {
    padding: 10px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }

  img {
    width: 30px;
    height: 30px;
  }
`;

const Button = styled.input`
position: relative;
right: 10vh;
  width: 110px;
  height: 40px;
  border-radius: 64px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  background: #00c8d6;
  border: none;
`;

const SideBar = styled.div`
  position: relative;
  height: 100vh;
  bottom: 2vh;
  width: 12vw;
  background-color: #ccc;
  box-shadow: 5px 0 15px rgb(133, 154, 199);
  @media (max-width: 768px) {
    width: 20vw;
  }

  @media (max-width: 480px) {
    width: 30vw;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 120px;
  padding-left: 20px;
  padding-top: 10px;
  cursor: pointer;
  border: 1px solid #00c8d6;
  transition: 0.5s;

  a {
    padding: 10px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }

  &:hover {
    background: #00c8d6;
    color: #fff;
  }

  img {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    height: 100px;
  }

  @media (max-width: 480px) {
    height: 80px;
  }
`;



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
      <LoginPopup isOpen={isLoginPopupOpen} onRequestClose={handleCloseLoginPopup} />
      <HeaderContainer>
        <Logo>
          <img src={LogoIcon} alt='ሙ'/>
        </Logo>
        <Nav>
          <img src={PlaySongs} alt="PlaySongs" />
          <Link to="/Playlist">PlaySongs</Link>
        </Nav>
        <Button value="Register" type="submit" onClick={handleLogoutClick} />
      </HeaderContainer>
      <SideBar>
        <nav>
          <NavList>
            <NavItem>
              <img src={HomeIcon} alt="Home" />
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <img src={AddSongIcon} alt="AddSongIcon" />
              <Link to="/AddSongs">AddSongs</Link>
            </NavItem>
            <NavItem>
              <img src={PlayListIcon} alt="PlayListIcon" />
              <Link to="/playlist">Playlist</Link>
            </NavItem>
          </NavList>
        </nav>
      </SideBar>
    </div>
  );
}

export default Header;

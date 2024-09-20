//  Grading System demo
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import StudentLanding from './Components/SongPages/Song_Home';
import PlaylistPage from './Components/SongPages/Playlist';
import AddSongPage from './Components/SongPages/AddSongs';
import './App.css'
import Footer from './Components/Footer/Footer';


function App() {

  return (
    <Router>
      {/* <Login/> */}
        <Header />
      <Routes>
        <Route path="/" element={<StudentLanding />} />
        <Route path="/addSongs" element={<AddSongPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
      </Routes>
      <Footer/>
    </Router>

  );
  }


export default App;


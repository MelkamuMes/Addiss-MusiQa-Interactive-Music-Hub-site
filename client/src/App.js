//  Grading System demo
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import StudentLanding from './Components/StudentPage/Song_Home';
import PlaylistPage from './Components/StudentPage/Playlist';
import AddSongPage from './Components/StudentPage/AddSongs';
import PlaySongs from './Components/StudentPage/PlaySongs';



function App() {

  return (
    <Router>
      {/* <Login/> */}
        <Header />
      <Routes>
        <Route path="/" element={<StudentLanding />} />
        <Route path="/addSongs" element={<AddSongPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/PlaySongs" element={<PlaySongs/>} />
      </Routes>
    </Router>

  );
  }


export default App;


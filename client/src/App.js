//  Grading System demo
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import StudentLanding from './Components/StudentPage/S_Home';
import PlaylistPage from './Components/StudentPage/Playlist';
import AddSongPage from './Components/StudentPage/AddSongs';
// import GradeResult from './Components/StudentPage/GradeResult_Page';
// import SemisterCourse from './Components/StudentPage/S_courses'
// import GradeIssue from './Components/StudentPage/Grade_Issue_page';
import Login from './userdata/Login';
import PlaySongs from './Components/StudentPage/PlaySongs';



function App() {
    if(Login === false) {
        return "Failed to login"
    } else {

  return (
    <Router>
      <Login/>
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
}

export default App;


// Music Player

// import React from 'react';
// import SongForm from './Components/SongForm';
// import SongList from './Components/SongList';
// import Header from './Components/Header/Header'

// function App() {
//     return (
//         <div className="App">
//             <Header/>
//             <h1>Music App</h1>
//             <SongForm />
//             <SongList />
//         </div>
//     );
// }

// export default App;

import React from 'react'
// import SongForm from '../SongForm';
import SongList from '../SongList';

function Playlist() {

  // const headingStyle = {
  //   // position: R,
  //   top:-50,
  //   left:-50,
  //   color: 'blue',
  //   padding: '10px',
  //   textAlign: 'center',  
  // };

  return (
    <div>
         <div className='songList_container' >
            <h1>Music Playlists</h1>
            {/* <SongForm /> */}
            <SongList />
         </div>
    </div>
  )
}

export default Playlist
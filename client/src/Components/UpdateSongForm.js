// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateSongForm = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [song, setSong] = useState(null);
//     const [title, setTitle] = useState('');
//     const [artist, setArtist] = useState('');
//     const [file, setFile] = useState(null);

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.get(`http://localhost:5000/api/songs/search?query=${searchTerm}`);
//             setSong(response.data);
//             if (response.data) {
//                 setTitle(response.data.title);
//                 setArtist(response.data.artist);
//             }
//         } catch (error) {
//             console.error('Error searching song:', error);
//         }
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('artist', artist);
//         if (file) {
//             formData.append('audio', file);
//         }

//         try {
//             await axios.put(`http://localhost:5000/api/songs/${song.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert('Song updated successfully!');
//             // Clear form
//             setSearchTerm('');
//             setSong(null);
//             setTitle('');
//             setArtist('');
//             setFile(null);
//         } catch (error) {
//             console.error('Error updating song:', error);
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h2>Update Song</h2>
//             <form onSubmit={handleSearch} style={styles.searchForm}>
//                 <input
//                     type="text"
//                     placeholder="Search by ID, Name, or Title"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     required
//                     style={styles.input}
//                 />
//                 <button type="submit" style={styles.button}>Search</button>
//             </form>

//             {song && (
//                 <form onSubmit={handleUpdate} style={styles.form}>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Artist"
//                         value={artist}
//                         onChange={(e) => setArtist(e.target.value)}
//                         required
//                         style={styles.input}
//                     />
//                     <input
//                         type="file"
//                         accept="audio/*"
//                         onChange={(e) => setFile(e.target.files[0])}
//                         style={styles.fileInput}
//                     />
//                     <button type="submit" style={styles.button}>Update Song</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// const styles = {
//     container: {
//         position: 'relative',
//         // top: '-15vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         maxWidth: '600px',
//         margin: '20px auto',
//         padding: '20px',
//         backgroundColor: '#f9f9f9',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     },
//     searchForm: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         width: '100%',
//         marginBottom: '20px',
//     },
//     input: {
//         width: '100%',
//         padding: '10px',
//         margin: '10px 0',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//         fontSize: '16px',
//     },
//     fileInput: {
//         width: '100%',
//         padding: '10px',
//         margin: '10px 0',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//         fontSize: '16px',
//         cursor: 'pointer',
//     },
//     button: {
//         padding: '10px 20px',
//         backgroundColor: '#00c8d6',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         marginTop: '10px',
//         transition: 'background-color 0.3s ease',
//     },
// };

// export default UpdateSongForm;

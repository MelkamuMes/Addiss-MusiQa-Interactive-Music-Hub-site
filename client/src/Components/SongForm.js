// import React, { useState } from 'react';
// import axios from 'axios';

// const SongForm = () => {
//     const [title, setTitle] = useState('');
//     const [artist, setArtist] = useState('');
//     const [file, setFile] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('artist', artist);
//         formData.append('audio', file);

//         try {
//             await axios.post('http://localhost:5000/api/songs', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             // Clear form
//             setTitle('');
//             setArtist('');
//             setFile(null);
//         } catch (error) {
//             console.error('Error adding song:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Artist"
//                 value={artist}
//                 onChange={(e) => setArtist(e.target.value)}
//                 required
//             />
//             <input
//                 type="file"
//                 accept="audio/*"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 required
//             />
//             <button type="submit">Add Song</button>
//         </form>
//     );
// };

// export default SongForm;



// ! Updated 

import React, { useState } from 'react';
import axios from 'axios';

const SongForm = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('audio', file);

        try {
            await axios.post('http://localhost:5000/api/songs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Clear form
            setTitle('');
            setArtist('');
            setFile(null);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files[0])}
                required
                style={styles.fileInput}
            />
            <button type="submit" style={styles.button}>Add Song</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        cursor: 'pointer',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#00c8d6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
};

export default SongForm;

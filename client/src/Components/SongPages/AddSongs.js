import React, { useState } from 'react';
import SongForm from '../SongForm';

function Contact() {
    const [message, setMessage] = useState('');
    const [editingSongId, setEditingSongId] = useState(null);

    // This could be triggered by some action, e.g., selecting a song to edit
    // const handleEditSong = (id) => {
    //     setEditingSongId(id);
    // };

    return (
        <div>
            <div className='addSong_container'>
                <h1>{editingSongId ? 'Edit Your Song' : 'Add Your Songs'}</h1>
                {/* Display confirmation message if it exists */}
                {message && <div style={styles.message}>{message}</div>}
                <SongForm setMessage={setMessage} songId={editingSongId} />
            </div>
        </div>
    );
}

const styles = {
    message: {
        color: '#00c8d6',
        backgroundColor: '#f0f8ff',
        border: '1px solid #00c8d6',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '20px',
        textAlign: 'center',
    },
};

export default Contact;

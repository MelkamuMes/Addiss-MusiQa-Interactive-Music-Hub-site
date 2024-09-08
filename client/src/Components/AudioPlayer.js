// !Updated

// import React, { useRef, useState } from 'react';
// import ReactHowler from 'react-howler';
// // todo avoiding simultanious audio playing effect

// const AudioPlayer = ({ url }) => {
//     const howlerRef = useRef(null);
//     const [playing, setPlaying] = useState(false);

//     const handlePlay = () => setPlaying(true);
//     const handlePause = () => setPlaying(false);

//     return (
//         <div style={styles.container}>
//             <ReactHowler
//                 src={url}
//                 playing={playing}
//                 ref={howlerRef}
//             />
//             <div style={styles.buttonContainer}>
//                 <button onClick={handlePlay} style={styles.button}>Play</button>
//                 <button onClick={handlePause} style={styles.button}>Pause</button>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '300px',
//         padding: '20px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         backgroundColor: '#f9f9f9',
//         margin: '20px auto'
//     },
//     buttonContainer: {
//         marginTop: '15px',
//         display: 'flex',
//         gap: '10px'
//     },
//     button: {
//         backgroundColor: '#007bff',
//         border: 'none',
//         color: 'white',
//         padding: '10px 20px',
//         textAlign: 'center',
//         textDecoration: 'none',
//         display: 'inline-block',
//         fontSize: '16px',
//         margin: '4px 2px',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s, transform 0.2s',
//     },
//     buttonHover: {
//         backgroundColor: '#0056b3',
//         transform: 'scale(1.05)',
//     },
// };

// export default AudioPlayer;


// ? Newly Updated 2 with next..
import React, { useRef, useState, useReducer } from 'react';
import ReactHowler from 'react-howler';

const initialState = {
    playing: false,
    currentIndex: 0,
    shuffle: false,
    repeat: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'PLAY':
            return { ...state, playing: true };
        case 'PAUSE':
            return { ...state, playing: false };
        case 'NEXT':
            return {
                ...state,
                currentIndex: action.shuffle
                    ? Math.floor(Math.random() * action.songs.length)
                    : (state.currentIndex + 1) % action.songs.length,
            };
        case 'PREVIOUS':
            return {
                ...state,
                currentIndex: state.currentIndex === 0
                    ? action.songs.length - 1
                    : state.currentIndex - 1,
            };
        case 'TOGGLE_SHUFFLE':
            return { ...state, shuffle: !state.shuffle };
        case 'TOGGLE_REPEAT':
            return { ...state, repeat: !state.repeat };
        default:
            return state;
    }
}

const AudioPlayer = ({ songs, initialIndex = 0 }) => {
    const howlerRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        currentIndex: initialIndex,
    });

    const handlePlay = () => dispatch({ type: 'PLAY' });
    const handlePause = () => dispatch({ type: 'PAUSE' });
    const handleNext = () => dispatch({ type: 'NEXT', shuffle: state.shuffle, songs });
    const handlePrevious = () => dispatch({ type: 'PREVIOUS', songs });
    const handleShuffle = () => dispatch({ type: 'TOGGLE_SHUFFLE' });
    const handleRepeat = () => dispatch({ type: 'TOGGLE_REPEAT' });

    return (
        <div style={styles.container}>
            <ReactHowler
                src={songs[state.currentIndex].url}
                playing={state.playing}
                ref={howlerRef}
                onEnd={() => {
                    if (state.repeat) {
                        handlePlay();
                    } else {
                        handleNext();
                    }
                }}
            />
            <div style={styles.buttonContainer}>
                <button 
                    onClick={handlePrevious} 
                    style={styles.button}
                    aria-label="Previous song"
                >
                    Previous
                </button>
                <button 
                    onClick={handlePlay} 
                    style={styles.button}
                    aria-label="Play song"
                >
                    Play
                </button>
                <button 
                    onClick={handlePause} 
                    style={styles.button}
                    aria-label="Pause song"
                >
                    Pause
                </button>
                <button 
                    onClick={handleNext} 
                    style={styles.button}
                    aria-label="Next song"
                >
                    Next
                </button>
                <button 
                    onClick={handleShuffle} 
                    style={styles.button}
                    aria-label={state.shuffle ? "Turn off shuffle" : "Turn on shuffle"}
                >
                    {state.shuffle ? 'Unshuffle' : 'Shuffle'}
                </button>
                <button 
                    onClick={handleRepeat} 
                    style={styles.button}
                    aria-label={state.repeat ? "Turn off repeat" : "Turn on repeat"}
                >
                    {state.repeat ? 'No Repeat' : 'Repeat'}
                </button>
            </div>
            <div style={styles.songInfo}>
                <span style={styles.songTitle}>
                    {songs[state.currentIndex].title} by {songs[state.currentIndex].artist}
                </span>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position:'relative',
        top:'10vh',
        left: '5vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '300px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f9f9f9',
        margin: '20px auto'
    },
    buttonContainer: {
        marginTop: '15px',
        display: 'flex',
        gap: '10px'
    },
    button: {
        backgroundColor: '#007bff',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        outline: 'none'
    },
    songInfo: {
        marginTop: '15px',
    },
    songTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
    }
};

export default AudioPlayer;

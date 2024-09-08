import React from 'react';
import './LoadingSpinner.css'; // Import CSS for spinner styles

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;

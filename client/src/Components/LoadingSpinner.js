/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const loadingSpinnerStyle = css`
    position: relative;
    padding-right: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f9f9f9;
`;

const spinnerStyle = css`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #009b93;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoadingSpinner = () => {
    return (
        <div css={loadingSpinnerStyle}>
            <div css={spinnerStyle}></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;

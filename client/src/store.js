import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songs/songSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './features/songs/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import firebase from '@react-native-firebase/app';

import reducer from './redux/reducer';
import HomeContainer from './HomeContainer';
import {enableAnalytics} from './services/analytics-service';

import {PersistGate} from 'redux-persist/integration/react';

/* eslint-disable no-console */
console.disableYellowBox = true;
/* eslint-enable no-console */

const persistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        firebase.initializeApp();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <HomeContainer />
                </PersistGate>
            </Provider>
        );
    }
}

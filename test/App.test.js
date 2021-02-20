import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Provider} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {createStore} from 'redux';

import App from '../src/App';

jest.mock('redux-persist');
jest.mock('redux');

describe('App.js', () => {
    let renderedComponent;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<App />);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    beforeEach(() => {
        renderComponent();
    });

    it('should create the store and the persistor', () => {
        expect(persistReducer).toHaveBeenCalledTimes(1);
        expect(createStore).toHaveBeenCalledTimes(1);
        expect(persistStore).toHaveBeenCalledTimes(1);
    });

    it('should render a root Provider', () => {
        expect(renderedComponent.type).toBe(Provider);
    });
});

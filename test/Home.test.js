import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import {SafeAreaView} from 'react-native';

import Home from '../src/Home';

jest.mock('../src/services/style-service');

const chance = new Chance();

describe('Home', () => {
    let renderedComponent,
        renderedInstance,
        expectedProps;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Home {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();
    };

    beforeEach(() => {
        expectedProps = {
            actions: {
                calculateTeamScore: jest.fn()
            },
            rounds: chance.string()
        };

        renderComponent();
    });

    describe('componentDidUpdate', () => {
        it('should calculate the score if the rounds have changed', () => {
            const prevProps = {
                ...expectedProps,
                rounds: chance.string()
            };

            renderedInstance.componentDidUpdate(prevProps);

            expect(expectedProps.actions.calculateTeamScore).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.calculateTeamScore).toHaveBeenCalledWith(expectedProps.rounds);
        });

        it('should **not** calculate the score if the rounds have not changed', () => {
            renderedInstance.componentDidUpdate(expectedProps);

            expect(expectedProps.actions.calculateTeamScore).not.toHaveBeenCalled();
        });
    });

    it('should render a root SafeAreaView', () => {
        expect(renderedComponent.type).toBe(SafeAreaView);
    });
});

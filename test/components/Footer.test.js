import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {View, Animated} from 'react-native';

import Footer from '../../src/components/Footer';
import {createRandomProps} from '../model-factory';

jest.mock('../../src/services/style-service');

describe('Footer', () => {
    let expectedProps,
        startSpy,

        renderedComponent,
        renderedInstance,
        renderedSubmitText;

    const cacheChildren = () => {
        const renderedSubmitTouchable = renderedComponent.props.children[1];
        const renderedSubmitView = renderedSubmitTouchable.props.children;

        renderedSubmitText = renderedSubmitView.props.children[3];
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Footer {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();
        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        startSpy = jest.fn();
        Animated.sequence = jest.fn(() => ({start: startSpy}));
        Animated.timing = jest.fn(() => ({start: startSpy}));

        renderComponent();
    });

    it('should render a root View', () => {
        expect(renderedComponent.type).toBe(View);
    });

    it('should call Animated.timing on _animateIn', () => {
        renderedInstance._animateIn();

        expect(Animated.timing).toHaveBeenCalledTimes(1);
        expect(Animated.timing).toHaveBeenCalledWith(renderedInstance.state.scale, {
            duration: 100,
            toValue: 0.9,
            useNativeDriver: true
        });
    });

    it('should call Animated.sequence on _animateOut', () => {
        renderedInstance._animateIn();

        expect(Animated.sequence).toHaveBeenCalledTimes(1);
        expect(Animated.timing).toHaveBeenCalledTimes(2);
        expect(Animated.timing).toHaveBeenCalledWith(renderedInstance.state.scale, {
            duration: 150,
            toValue: 1.1,
            useNativeDriver: true
        });
        expect(Animated.timing).toHaveBeenCalledWith(renderedInstance.state.scale, {
            duration: 150,
            toValue: 1,
            useNativeDriver: true
        });
    });

    it('should render the text as SUBMIT BIDS when isBids', () => {
        expectedProps.isBids = true;
        renderComponent();

        expect(renderedSubmitText.props.children).toBe('SUBMIT BIDS');
    });

    it('should render the text as SUBMIT RESULTS when not isBids', () => {
        expectedProps.isBids = false;
        renderComponent();

        expect(renderedSubmitText.props.children).toBe('SUBMIT RESULTS');
    });
});

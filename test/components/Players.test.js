import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Chance from 'chance';
import {TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimateNumber from 'react-native-animate-number';

import Players from '../../src/components/Players';
import {createRandomProps} from '../model-factory';
import {PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO} from '../../src/constants/constants';

jest.mock('../../src/services/style-service');

const chance = new Chance();

describe('Players', () => {
    let expectedProps,

        renderedComponent,

        renderedLeftView,
        renderedRightView,

        renderedLeftScoreText,
        renderedLeftLinearGradient,

        renderedRightScoreText,
        renderedRightLinearGradient,

        renderedPlayer1View,
        renderedPlayer2View,

        renderedPlayer3View,
        renderedPlayer4View,

        renderedPlayer1Input,
        renderedPlayer2Input,

        renderedPlayer3Input,
        renderedPlayer4Input;

    const cacheChildren = () => {
        [
            renderedLeftView,
            renderedRightView
        ] = renderedComponent.props.children;

        [
            renderedLeftScoreText,
            renderedLeftLinearGradient
        ] = renderedLeftView.props.children;

        [
            renderedRightScoreText,
            renderedRightLinearGradient
        ] = renderedRightView.props.children;

        [
            renderedPlayer1View,
            renderedPlayer2View
        ] = renderedLeftLinearGradient.props.children;

        [
            renderedPlayer3View,
            renderedPlayer4View
        ] = renderedRightLinearGradient.props.children;

        renderedPlayer1Input = renderedPlayer1View.props.children;
        renderedPlayer2Input = renderedPlayer2View.props.children;
        renderedPlayer3Input = renderedPlayer3View.props.children;
        renderedPlayer4Input = renderedPlayer4View.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Players {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root View', () => {
        expect(renderedComponent.type).toBe(View);
    });

    it('should render a left view', () => {
        expect(renderedLeftView.type).toBe(View);
    });

    it('should render the left score text', () => {
        expect(renderedLeftScoreText.type).toBe(AnimateNumber);
    });

    it('should render the left linear gradient', () => {
        expect(renderedLeftLinearGradient.type).toBe(LinearGradient);
    });

    it('should render the player 1 view', () => {
        expect(renderedPlayer1View.type).toBe(View);
    });

    it('should render the player 1 input', () => {
        const expectedName = chance.string();

        expect(renderedPlayer1Input.type).toBe(TextInput);

        renderedPlayer1Input.props.onChangeText(expectedName);

        expect(expectedProps.actions.setName).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.setName).toHaveBeenCalledWith(expectedName, PLAYER_ONE);
    });

    it('should render the player 2 view', () => {
        expect(renderedPlayer2View.type).toBe(View);
    });

    it('should render the player 2 input', () => {
        const expectedName = chance.string();

        expect(renderedPlayer2Input.type).toBe(TextInput);

        renderedPlayer2Input.props.onChangeText(expectedName);

        expect(expectedProps.actions.setName).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.setName).toHaveBeenCalledWith(expectedName, PLAYER_TWO);
    });

    it('should render a right view', () => {
        expect(renderedRightView.type).toBe(View);
    });

    it('should render the right score text', () => {
        expect(renderedRightScoreText.type).toBe(AnimateNumber);
    });

    it('should render the right linear gradient', () => {
        expect(renderedRightLinearGradient.type).toBe(LinearGradient);
    });

    it('should render the player 3 view', () => {
        expect(renderedPlayer3View.type).toBe(View);
    });

    it('should render the player 3 input', () => {
        const expectedName = chance.string();

        expect(renderedPlayer3Input.type).toBe(TextInput);

        renderedPlayer3Input.props.onChangeText(expectedName);

        expect(expectedProps.actions.setName).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.setName).toHaveBeenCalledWith(expectedName, PLAYER_THREE);
    });

    it('should render the player 4 view', () => {
        expect(renderedPlayer4View.type).toBe(View);
    });

    it('should render the player 4 input', () => {
        const expectedName = chance.string();

        expect(renderedPlayer4Input.type).toBe(TextInput);

        renderedPlayer4Input.props.onChangeText(expectedName);

        expect(expectedProps.actions.setName).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.setName).toHaveBeenCalledWith(expectedName, PLAYER_FOUR);
    });
});

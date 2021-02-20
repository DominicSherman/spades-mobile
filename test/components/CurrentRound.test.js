import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import {View} from 'react-native';

import CurrentRound from '../../src/components/CurrentRound';
import {createRandomProps} from '../model-factory';
import {PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO} from '../../src/constants/constants';

const chance = new Chance();

describe('CurrentRound', () => {
    let expectedProps,

        renderedComponent,

        renderedPlayer1Input,
        renderedPlayer2Input,
        renderedPlayer3Input,
        renderedPlayer4Input;

    const cacheChildren = () => {
        [
            renderedPlayer1Input,
            renderedPlayer2Input,
            renderedPlayer3Input,
            renderedPlayer4Input
        ] = renderedComponent.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<CurrentRound {...expectedProps} />);

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

    it('should submit the value for each onChangeText', () => {
        const expectedBid = chance.natural();

        renderedPlayer1Input.props.onChangeText(expectedBid);
        renderedPlayer2Input.props.onChangeText(expectedBid);
        renderedPlayer3Input.props.onChangeText(expectedBid);
        renderedPlayer4Input.props.onChangeText(expectedBid);

        expect(expectedProps.actions.submitValue).toHaveBeenCalledTimes(4);
        expect(expectedProps.actions.submitValue).toHaveBeenCalledWith(expectedBid, PLAYER_ONE);
        expect(expectedProps.actions.submitValue).toHaveBeenCalledWith(expectedBid, PLAYER_TWO);
        expect(expectedProps.actions.submitValue).toHaveBeenCalledWith(expectedBid, PLAYER_THREE);
        expect(expectedProps.actions.submitValue).toHaveBeenCalledWith(expectedBid, PLAYER_FOUR);
    });
});

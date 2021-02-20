import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {TouchableWithoutFeedback} from 'react-native';

import CurrentBids from '../../src/components/CurrentBids';
import {createRandomProps} from '../model-factory';

jest.mock('../../src/services/style-service');

describe('CurrentBids', () => {
    let expectedProps,

        renderedComponent,
        renderedInstance;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<CurrentBids {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root TouchableWithoutFeedback', () => {
        expect(renderedComponent.type).toBe(TouchableWithoutFeedback);
    });

    it('should return the correct bags when isBids', () => {
        expectedProps.isBids = true;
        renderComponent();

        const actualBags = renderedInstance.getBags();

        expect(actualBags).toBe(13 - (expectedProps.currRound.player1Bid + expectedProps.currRound.player2Bid + expectedProps.currRound.player3Bid + expectedProps.currRound.player4Bid));
    });

    it('should set the bids to 0 if they are 100', () => {
        expectedProps.isBids = true;
        expectedProps.currRound.player1Bid = 100;
        expectedProps.currRound.player2Bid = 100;
        expectedProps.currRound.player3Bid = 100;
        expectedProps.currRound.player4Bid = 100;
        renderComponent();

        const actualBags = renderedInstance.getBags();

        expect(actualBags).toBe(13);
    });

    it('should return the correct bags when **not** isBids', () => {
        expectedProps.isBids = false;
        renderComponent();

        const actualBags = renderedInstance.getBags();

        expect(actualBags).toBe(13 - (expectedProps.bids.team1Bids + expectedProps.bids.team2Bids));
    });
});

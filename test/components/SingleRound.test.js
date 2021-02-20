import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {View} from 'react-native';

import SingleRound from '../../src/components/SingleRound';
import {createRandomRound} from '../model-factory';
import {roundHasResults} from '../../src/constants/score-helpers';

jest.mock('../../src/constants/score-helpers');

describe('SingleRound', () => {
    let expectedProps,

        renderedComponent;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<SingleRound {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    beforeEach(() => {
        expectedProps = {
            item: createRandomRound()
        };

        roundHasResults.mockReturnValue(true);

        renderComponent();
    });

    it('should render a root View', () => {
        expect(renderedComponent.type).toBe(View);
    });

    it('should render a top view when the round has results', () => {
        const renderedTopView = renderedComponent.props.children[0];

        expect(renderedTopView.type).toBe(View);
    });

    it('should **not** render a top view when the round has results', () => {
        roundHasResults.mockReturnValue(false);
        renderComponent();

        const renderedTopView = renderedComponent.props.children[0];

        expect(renderedTopView).toBeNull();
    });
});

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {View} from 'react-native';

import Header from '../../src/components/Header';
import {createRandomProps} from '../model-factory';

jest.mock('../../src/services/style-service');

describe('Header', () => {
    let expectedProps,

        renderedComponent;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Header {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root View', () => {
        expect(renderedComponent.type).toBe(View);
    });

    it('should pass undo onPress to the undo headerIcon', () => {
        const renderedUndo = renderedComponent.props.children[2];

        renderedUndo.props.onPress();

        expect(expectedProps.actions.undo).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.undo).toHaveBeenCalledWith(expectedProps.isBids);
    });
});

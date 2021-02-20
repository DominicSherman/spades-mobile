import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {View} from 'react-native';

import ShowHistoryButton from '../../src/components/ShowHistoryButton';
import {createRandomProps} from '../model-factory';

describe('ShowHistoryButton', () => {
    let expectedProps,

        renderedComponent;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<ShowHistoryButton {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root View', () => {
        expect(renderedComponent.type).toBe(View);
    });
});

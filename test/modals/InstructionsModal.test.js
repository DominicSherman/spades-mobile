import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Modal} from 'react-native';

import InstructionsModal from '../../src/modals/InstructionsModal';
import {createRandomProps} from '../model-factory';

describe('InstructionsModal', () => {
    let expectedProps,

        renderedComponent;

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<InstructionsModal {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root Modal', () => {
        expect(renderedComponent.type).toBe(Modal);
    });
});

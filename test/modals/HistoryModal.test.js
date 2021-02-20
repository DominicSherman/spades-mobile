import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import HistoryModal from '../../src/modals/HistoryModal';
import {createRandomProps} from '../model-factory';
import SingleRound from '../../src/components/SingleRound';
import Players from '../../src/components/Players';

const chance = new Chance();

describe('HistoryModal', () => {
    let expectedProps,

        renderedComponent,

        renderedSafeAreaView,

        renderedCloseIcon,
        renderedPlayers,
        renderedFlatlist;

    const cacheChildren = () => {
        renderedSafeAreaView = renderedComponent.props.children;

        [
            renderedCloseIcon,
            renderedPlayers,
            renderedFlatlist
        ] = renderedSafeAreaView.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<HistoryModal {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    it('should render a root Modal', () => {
        expect(renderedComponent.type).toBe(Modal);
    });

    it('should render a SafeAreaView', () => {
        expect(renderedSafeAreaView.type).toBe(SafeAreaView);
    });

    it('should render a close icon', () => {
        expect(renderedCloseIcon.type).toBe(EvilIcons);
    });

    it('should render the Players', () => {
        expect(renderedPlayers.type).toBe(Players);
    });

    it('should render a FlatList', () => {
        expect(renderedFlatlist.type).toBe(FlatList);
        expect(renderedFlatlist.props.data).toBe(expectedProps.rounds);

        const item = chance.string();
        const index = chance.natural();
        const key = renderedFlatlist.props.keyExtractor(item, index);
        const renderedItem = renderedFlatlist.props.renderItem({item});

        expect(key).toBe(`${index}`);
        expect(renderedItem.type).toBe(SingleRound);
        expect(renderedItem.props.item).toBe(item);
        expect(renderedItem.props.theme).toBe(expectedProps.theme);
    });
});

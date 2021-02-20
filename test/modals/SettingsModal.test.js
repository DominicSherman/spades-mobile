import React from 'react';
import Chance from 'chance';
import ShallowRenderer from 'react-test-renderer/shallow';
import {FlatList, Modal, SafeAreaView, Switch, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Touchable from 'react-native-platform-touchable';
import Feather from 'react-native-vector-icons/Feather';

import SettingsModal from '../../src/modals/SettingsModal';
import {createRandomProps} from '../model-factory';
import {DARK, LIGHT} from '../../src/constants/constants';
import {setDefault} from '../../src/services/style-service';
import {green, lightGray} from '../../src/constants/style-variables';

jest.mock('../../src/services/style-service');

const chance = new Chance();

describe('SettingsModal', () => {
    let expectedProps,

        renderedInstance,
        renderedComponent,
        renderedSafeAreaView,

        renderedCloseIcon,
        renderedWrapperView,

        renderedHeaderWrapper,
        renderedThemeWrapper,
        renderedColorWrapper,

        renderedSettingsText,

        renderedThemeText,
        renderedSwitchWrapper,

        renderedColorText,
        renderedColorsFlatList,

        renderedDarkText,
        renderedSwitch,
        renderedLightText;

    const cacheChildren = () => {
        renderedSafeAreaView = renderedComponent.props.children;

        [
            renderedCloseIcon,
            renderedWrapperView
        ] = renderedSafeAreaView.props.children;

        [
            renderedHeaderWrapper,
            renderedThemeWrapper,
            renderedColorWrapper
        ] = renderedWrapperView.props.children;

        renderedSettingsText = renderedHeaderWrapper.props.children;

        [
            renderedThemeText,
            renderedSwitchWrapper
        ] = renderedThemeWrapper.props.children;

        [
            renderedColorText,
            renderedColorsFlatList
        ] = renderedColorWrapper.props.children;

        [
            renderedDarkText,
            renderedSwitch,
            renderedLightText
        ] = renderedSwitchWrapper.props.children;
    };

    const renderComponent = () => {
        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<SettingsModal {...expectedProps} />);

        renderedComponent = shallowRenderer.getRenderOutput();
        renderedInstance = shallowRenderer.getMountedInstance();

        cacheChildren();
    };

    beforeEach(() => {
        expectedProps = createRandomProps();

        renderComponent();
    });

    describe('componentDidUpdate', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should set the default if the props have changed', () => {
            const prevProps = {
                ...expectedProps,
                theme: {
                    background: chance.string()
                }
            };

            renderedInstance.componentDidUpdate(prevProps);

            expect(setDefault).toHaveBeenCalledTimes(1);
            expect(setDefault).toHaveBeenCalledWith(expectedProps.theme, expectedProps.actions.setColor);
        });

        it('should **not** set the default if the props have **not** changed', () => {
            renderedInstance.componentDidUpdate(expectedProps);

            expect(setDefault).not.toHaveBeenCalled();
        });
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

    it('should render a wrapper view', () => {
        expect(renderedWrapperView.type).toBe(View);
    });

    it('should render a header wrapper', () => {
        expect(renderedHeaderWrapper.type).toBe(View);
    });

    it('should render the settings text', () => {
        expect(renderedSettingsText.type).toBe(Text);
        expect(renderedSettingsText.props.children).toBe('Settings');
    });

    it('should render the theme wrapper', () => {
        expect(renderedThemeWrapper.type).toBe(View);
    });

    it('should render the theme text', () => {
        expect(renderedThemeText.type).toBe(Text);
        expect(renderedThemeText.props.children).toBe('Theme');
    });

    it('should render the switch wrapper', () => {
        expect(renderedSwitchWrapper.type).toBe(View);
    });

    it('should render the dark text', () => {
        expect(renderedDarkText.type).toBe(Text);
        expect(renderedDarkText.props.children).toBe('Dark');
    });

    describe('switch', () => {
        it('should render the switch', () => {
            expect(renderedSwitch.type).toBe(Switch);
        });

        it('should set the theme to light if it is switched to true', () => {
            renderedSwitch.props.onValueChange(true);

            expect(expectedProps.actions.setTheme).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.setTheme).toHaveBeenCalledWith(LIGHT);
        });

        it('should set the theme to dark if it is switched to false', () => {
            renderedSwitch.props.onValueChange(false);

            expect(expectedProps.actions.setTheme).toHaveBeenCalledTimes(1);
            expect(expectedProps.actions.setTheme).toHaveBeenCalledWith(DARK);
        });
    });

    it('should render the light text', () => {
        expect(renderedLightText.type).toBe(Text);
        expect(renderedLightText.props.children).toBe('Light');
    });

    it('should render the color wrapper', () => {
        expect(renderedColorWrapper.type).toBe(View);
    });

    it('should render the color text', () => {
        expect(renderedColorText.type).toBe(Text);
        expect(renderedColorText.props.children).toBe('Color');
    });

    it('should render the FlatList when the color is selected', () => {
        expect(renderedColorsFlatList.type).toBe(FlatList);

        const item = expectedProps.theme.color;

        const renderedTouchable = renderedColorsFlatList.props.renderItem({item});
        const renderedWrapper = renderedTouchable.props.children;
        const [
            renderedIcon,
            renderedText
        ] = renderedWrapper.props.children;

        expect(renderedTouchable.type).toBe(Touchable);
        expect(renderedWrapper.type).toBe(View);
        expect(renderedIcon.type).toBe(Feather);
        expect(renderedIcon.props.color).toBe(green);
        expect(renderedIcon.props.name).toBe('check-circle');
        expect(renderedText.type).toBe(Text);

        renderedTouchable.props.onPress();

        expect(expectedProps.actions.setColor).toHaveBeenCalledTimes(1);
        expect(expectedProps.actions.setColor).toHaveBeenCalledWith(item);
    });

    it('should render the FlatList when the color is **not** selected', () => {
        expect(renderedColorsFlatList.type).toBe(FlatList);

        const item = chance.string();

        const renderedTouchable = renderedColorsFlatList.props.renderItem({item});
        const renderedWrapper = renderedTouchable.props.children;
        const [renderedIcon] = renderedWrapper.props.children;

        expect(renderedIcon.type).toBe(Feather);
        expect(renderedIcon.props.color).toBe(lightGray);
        expect(renderedIcon.props.name).toBe('circle');
    });
});

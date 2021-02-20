import React, {Component} from 'react';
import {FlatList, Modal, SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

import {DARK, LIGHT} from '../constants/constants';
import {getBackgroundColor, getColorsForTheme, getDarkTextColor, setDefault} from '../services/style-service';
import {green, lightGray} from '../constants/style-variables';

export default class SettingsModal extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.theme.background !== this.props.theme.background) {
            setDefault(this.props.theme, this.props.actions.setColor);
        }
    }

    _getStyles = () => StyleSheet.create({
        headerText: {
            color: getDarkTextColor(this.props.theme),
            fontSize: 25,
            fontWeight: '400',
            paddingBottom: '15%'
        },
        headerText2: {
            color: getDarkTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400',
            paddingBottom: '5%'
        },
        headerWrapper: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        icon: {
            color: getDarkTextColor(this.props.theme),
            left: '3%'
        },
        optionTouchable: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingLeft: 100,
            width: '100%'
        },
        optionWrapper: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingBottom: 15,
            paddingTop: 15,
            width: '100%'
        },
        secondWrapper: {
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            paddingTop: '10%'
        },
        settingsWrapper: {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        switchWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '50%'
        },
        text: {
            color: getDarkTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '200'
        },
        view: {
            flexDirection: 'column',
            height: '70%',
            padding: '3%'
        },
        wrapper: {
            backgroundColor: getBackgroundColor(this.props.theme),
            height: '100%',
            paddingLeft: '1%'
        }
    });

    _getIconName = (color) => this.props.theme.color === color ? 'check-circle' : 'circle';

    _getIconColor = (color) => this.props.theme.color === color ? green : lightGray;

    render() {
        const {actions, showSettingsModal, onClose, theme} = this.props;
        const styles = this._getStyles();
        const colors = getColorsForTheme(theme);

        return (
            <Modal
                animationType={'slide'}
                visible={showSettingsModal}
            >
                <SafeAreaView style={styles.wrapper}>
                    <EvilIcons
                        name={'close'}
                        onPress={onClose}
                        size={30}
                        style={styles.icon}
                    />
                    <View
                        style={styles.view}
                    >
                        <View style={styles.headerWrapper}>
                            <Text style={styles.headerText}>{'Settings'}</Text>
                        </View>
                        <View style={styles.settingsWrapper}>
                            <Text style={styles.headerText2}>{'Theme'}</Text>
                            <View style={styles.switchWrapper}>
                                <Text style={styles.text}>{'Dark'}</Text>
                                <Switch
                                    onValueChange={(value) => value ? actions.setTheme(LIGHT) : actions.setTheme(DARK)}
                                    value={theme.background === LIGHT}
                                />
                                <Text style={styles.text}>{'Light'}</Text>
                            </View>
                        </View>
                        <View style={styles.secondWrapper}>
                            <Text style={styles.headerText2}>{'Color'}</Text>
                            <FlatList
                                data={colors}
                                renderItem={({item}) =>
                                    <Touchable
                                        onPress={() => actions.setColor(item)}
                                        style={styles.optionTouchable}
                                    >
                                        <View style={styles.optionWrapper}>
                                            <Feather
                                                color={this._getIconColor(item)}
                                                name={this._getIconName(item)}
                                                size={20}
                                            />
                                            <Text style={[styles.text, {paddingLeft: 15}]}>{item}</Text>
                                        </View>
                                    </Touchable>
                                }
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        );
    }
}

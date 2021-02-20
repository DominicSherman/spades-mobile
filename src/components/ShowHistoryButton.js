import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {getShadow} from '../constants/shadow-styles';
import {getFooterIconColor, getSubmitArrowColor} from '../services/style-service';

export default class ShowHistoryButton extends Component {
    _getStyles = () => StyleSheet.create({
        showHistoryButton: {
            alignItems: 'center',
            backgroundColor: getFooterIconColor(this.props.theme),
            borderRadius: 100,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            ...getShadow(this.props.theme)
        },
        text: {
            color: getSubmitArrowColor(this.props.theme),
            fontFamily: 'ArialRoundedMTBold',
            fontSize: 20
        },
        touchable: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '50%',
            ...getShadow(this.props.theme)
        },
        wrapper: {
            alignItems: 'center',
            flex: 0.2,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: '2%',
            width: '100%'
        }
    });

    render() {
        const {actions: {toggleShowHistory}} = this.props;
        const styles = this._getStyles();

        return (
            <View style={styles.wrapper}>
                <Touchable
                    onPress={toggleShowHistory}
                    style={styles.touchable}
                >
                    <View style={styles.showHistoryButton}>
                        <Text style={styles.text}>{'Show History'}</Text>
                    </View>
                </Touchable>
            </View>
        );
    }
}

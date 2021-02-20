import React, {Component} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';

import {PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO} from '../constants/constants';
import {getLightTextColor} from '../services/style-service';

export default class CurrentRound extends Component {
    _getStyles = () => StyleSheet.create({
        textInput: {
            alignItems: 'center',
            borderColor: getLightTextColor(this.props.theme),
            borderWidth: 1,
            color: getLightTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '600',
            height: Dimensions.get('screen').width / 4,
            justifyContent: 'center',
            marginBottom: 10,
            marginTop: 10,
            textAlign: 'center',
            width: Dimensions.get('screen').width / 4
        },
        wrapper: {
            flexDirection: 'row',
            justifyContent: 'center'
        }
    });

    render() {
        const {actions, currRound} = this.props;
        const styles = this._getStyles();

        return (
            <View style={styles.wrapper}>
                <TextInput
                    clearTextOnFocus
                    keyboardType={'number-pad'}
                    onChangeText={(bid) => actions.submitValue(bid, PLAYER_ONE)}
                    placeholder={'0'}
                    style={styles.textInput}
                    value={`${currRound.player1Bid}`}
                />
                <TextInput
                    clearTextOnFocus
                    keyboardType={'number-pad'}
                    onChangeText={(bid) => actions.submitValue(bid, PLAYER_TWO)}
                    placeholder={'0'}
                    style={styles.textInput}
                    value={`${currRound.player2Bid}`}
                />
                <TextInput
                    clearTextOnFocus
                    keyboardType={'number-pad'}
                    onChangeText={(bid) => actions.submitValue(bid, PLAYER_THREE)}
                    placeholder={'0'}
                    style={styles.textInput}
                    value={`${currRound.player3Bid}`}
                />
                <TextInput
                    clearTextOnFocus
                    keyboardType={'number-pad'}
                    onChangeText={(bid) => actions.submitValue(bid, PLAYER_FOUR)}
                    placeholder={'0'}
                    style={styles.textInput}
                    value={`${currRound.player4Bid}`}
                />
            </View>
        );
    }
}

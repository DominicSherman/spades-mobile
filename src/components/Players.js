import React, {Component} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimateNumber from 'react-native-animate-number';

import {PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO} from '../constants/constants';
import {getShadow} from '../constants/shadow-styles';
import {
    getLeftScoreColor,
    getLeftTeamGradient,
    getPlayerDividerColor,
    getPlayerTextColor,
    getRightScoreColor,
    getRightTeamGradient
} from '../services/style-service';

export default class Players extends Component {
    _getStyles = () => StyleSheet.create({
        borderLeft: {
            borderBottomLeftRadius: 50,
            borderTopLeftRadius: 50
        },
        borderRight: {
            borderBottomRightRadius: 50,
            borderTopRightRadius: 50
        },
        centeredRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
        },
        headerText: {
            color: getLeftScoreColor(this.props.theme),
            fontFamily: 'ArialRoundedMTBold',
            fontSize: 40,
            fontWeight: '600',
            padding: 10,
            ...getShadow(this.props.theme)
        },
        leftTeamView: {
            borderRightColor: getPlayerDividerColor(this.props.theme),
            borderRightWidth: 1
        },
        nameText: {
            color: getPlayerTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400'
        },
        rightTeamView: {
            borderLeftColor: getPlayerDividerColor(this.props.theme),
            borderLeftWidth: 1
        },
        singleColumn: {
            alignItems: 'center',
            flexDirection: 'row',
            height: 60,
            justifyContent: 'center',
            width: Dimensions.get('screen').width / 4
        },
        teamView: {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            width: Dimensions.get('screen').width / 2
        }
    });

    render() {
        const {actions, team1, team2, theme} = this.props;
        const styles = this._getStyles();

        return (
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.teamView, styles.leftTeamView]}>
                    <AnimateNumber
                        countBy={5}
                        steps={10}
                        style={[styles.headerText, {color: getLeftScoreColor(theme)}]}
                        value={team1.score}
                    />
                    <LinearGradient
                        colors={getLeftTeamGradient(theme)}
                        end={{
                            x: 1,
                            y: 0
                        }}
                        start={{
                            x: 0,
                            y: 0
                        }}
                        style={[styles.centeredRow, styles.borderLeft]}
                    >
                        <View style={styles.singleColumn}>
                            <TextInput
                                clearTextOnFocus
                                onChangeText={(name) => actions.setName(name, PLAYER_ONE)}
                                placeholder={'Player 1'}
                                style={styles.nameText}
                                value={team1.firstPlayer}
                            />
                        </View>
                        <View style={styles.singleColumn}>
                            <TextInput
                                clearTextOnFocus
                                onChangeText={(name) => actions.setName(name, PLAYER_TWO)}
                                placeholder={'Player 2'}
                                style={styles.nameText}
                                value={team1.secondPlayer}
                            />
                        </View>
                    </LinearGradient>
                </View>
                <View style={[styles.teamView, styles.rightTeamView]}>
                    <AnimateNumber
                        countBy={5}
                        steps={10}
                        style={[styles.headerText, {color: getRightScoreColor(theme)}]}
                        value={team2.score}
                    />
                    <LinearGradient
                        colors={getRightTeamGradient(theme)}
                        end={{
                            x: 1,
                            y: 0
                        }}
                        start={{
                            x: 0,
                            y: 0
                        }}
                        style={[styles.centeredRow, styles.borderRight]}
                    >
                        <View style={styles.singleColumn}>
                            <TextInput
                                clearTextOnFocus
                                onChangeText={(name) => actions.setName(name, PLAYER_THREE)}
                                placeholder={'Player 3'}
                                style={styles.nameText}
                                value={team2.firstPlayer}
                            />
                        </View>
                        <View style={styles.singleColumn}>
                            <TextInput
                                clearTextOnFocus
                                onChangeText={(name) => actions.setName(name, PLAYER_FOUR)}
                                placeholder={'Player 4'}
                                style={styles.nameText}
                                value={team2.secondPlayer}
                            />
                        </View>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}

import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import {getLightTextColor} from '../services/style-service';
import {roundHasResults} from '../constants/score-helpers';

export default class SingleRound extends Component {
    _getStyles = () => StyleSheet.create({
        actualView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 10,
            width: Dimensions.get('screen').width / 2
        },
        rowView: {
            borderBottomColor: getLightTextColor(this.props.theme),
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 10,
            width: Dimensions.get('screen').width / 2
        },
        scoreText: {
            color: getLightTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400'
        },
        teamView: {
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: 10,
            width: Dimensions.get('screen').width / 2
        },
        text: {
            color: getLightTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '200'
        }
    });

    render() {
        const {
            playerOne,
            playerTwo,
            playerThree,
            playerFour,
            score
        } = this.props.item;
        const styles = this._getStyles();

        return (
            <View style={{flex: 1}}>
                {
                    roundHasResults(this.props.item) ?
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style={styles.scoreText}>{`${score.score1} - ${score.score2}`}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.teamView}>
                                    <View style={styles.actualView}>
                                        <Text style={styles.text}>{`${playerOne.actual}`}</Text>
                                        <Text style={styles.text}>{`${playerTwo.actual}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.teamView}>
                                    <View style={styles.actualView}>
                                        <Text style={styles.text}>{`${playerThree.actual}`}</Text>
                                        <Text style={styles.text}>{`${playerFour.actual}`}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        null
                }
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.teamView}>
                        <View style={styles.rowView}>
                            <Text style={styles.text}>{playerOne.bid}</Text>
                            <Text style={styles.text}>{playerTwo.bid}</Text>
                        </View>
                    </View>
                    <View style={styles.teamView}>
                        <View style={styles.rowView}>
                            <Text style={styles.text}>{playerThree.bid}</Text>
                            <Text style={styles.text}>{playerFour.bid}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

import React, {Component} from 'react';
import {Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import {getRightScoreColor, getLightTextColor, getLeftScoreColor} from '../services/style-service';

export default class CurrentBids extends Component {
    shouldShowCurrBids = () => !this.props.isBids;

    getBags = () => {
        const {
            currRound: {
                player1Bid,
                player2Bid,
                player3Bid,
                player4Bid
            },
            bids
        } = this.props;

        const getBid = (playerBid) => Number(playerBid) === 100 ? 0 : Number(playerBid);

        if (this.shouldShowCurrBids()) {
            return 13 - (bids.team1Bids + bids.team2Bids);
        }

        return 13 - (getBid(player1Bid) + getBid(player2Bid) + getBid(player3Bid) + getBid(player4Bid));
    };

    _getStyles = () => StyleSheet.create({
        centeredRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%'
        },
        currentRoundScoreWrapper: {
            alignItems: 'flex-start',
            width: Dimensions.get('screen').width / 6
        },
        currentRoundWrapper: {
            alignItems: 'flex-end',
            flexDirection: 'column',
            height: '70%',
            justifyContent: 'space-evenly',
            width: Dimensions.get('screen').width / 4
        },
        headerText: {
            color: getLightTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400'
        },
        team1Text: {
            color: getLeftScoreColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400'
        },
        team2Text: {
            color: getRightScoreColor(this.props.theme),
            fontSize: 20,
            fontWeight: '400'
        }
    });

    render() {
        const {
            team1,
            team2,
            bids
        } = this.props;
        const styles = this._getStyles();

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    keyboardShouldPersistTaps={'never'}
                    style={{flex: 1}}
                >
                    <View style={[styles.centeredRow, {padding: 20}]}>
                        <Text style={[styles.headerText, {fontWeight: '600'}]}>
                            {`Available Bags: ${this.getBags()}`}
                        </Text>
                    </View>
                    {
                        this.shouldShowCurrBids() &&
                        <View style={{flex: 1}}>
                            <View style={styles.centeredRow}>
                                <Text style={styles.headerText}>{'Bids'}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View style={styles.currentRoundWrapper}>
                                    <Text style={styles.team1Text}>
                                        {`${team1.firstPlayer}: `}
                                    </Text>
                                    <Text style={styles.team1Text}>
                                        {`${team1.secondPlayer}: `}
                                    </Text>
                                    <Text style={styles.team1Text}>
                                        {'Total: '}
                                    </Text>
                                </View>
                                <View style={[styles.currentRoundWrapper, styles.currentRoundScoreWrapper]}>
                                    <Text style={styles.team1Text}>
                                        {bids.playerOne.bid}
                                    </Text>
                                    <Text style={styles.team1Text}>
                                        {bids.playerTwo.bid}
                                    </Text>
                                    <Text style={styles.team1Text}>
                                        {bids.team1Bids}
                                    </Text>
                                </View>
                                <View style={styles.currentRoundWrapper}>
                                    <Text style={styles.team2Text}>
                                        {`${team2.firstPlayer}: `}
                                    </Text>
                                    <Text style={styles.team2Text}>
                                        {`${team2.secondPlayer}: `}
                                    </Text>
                                    <Text style={styles.team2Text}>
                                        {'Total: '}
                                    </Text>
                                </View>
                                <View style={[styles.currentRoundWrapper, styles.currentRoundScoreWrapper]}>
                                    <Text style={styles.team2Text}>
                                        {bids.playerThree.bid}
                                    </Text>
                                    <Text style={styles.team2Text}>
                                        {bids.playerFour.bid}
                                    </Text>
                                    <Text style={styles.team2Text}>
                                        {bids.team2Bids}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

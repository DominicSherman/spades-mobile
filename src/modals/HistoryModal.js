import React, {Component} from 'react';
import {FlatList, Modal, SafeAreaView, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import SingleRound from '../components/SingleRound';
import Players from '../components/Players';
import {getBackgroundColor, getDarkTextColor} from '../services/style-service';

export default class HistoryModal extends Component {
    _getStyles = () => StyleSheet.create({
        flatList: {
            flex: 1,
            height: '100%',
            paddingTop: '3%'
        },
        icon: {
            color: getDarkTextColor(this.props.theme),
            left: '3%'
        },
        wrapper: {
            backgroundColor: getBackgroundColor(this.props.theme),
            flex: 1,
            paddingTop: '11%'
        }
    });

    render() {
        const {rounds, shouldShowHistory, actions, team1, team2, theme} = this.props;
        const styles = this._getStyles();

        return (
            <Modal
                animationType={'slide'}
                visible={shouldShowHistory}
            >
                <SafeAreaView style={styles.wrapper}>
                    <EvilIcons
                        name={'close'}
                        onPress={actions.toggleShowHistory}
                        size={30}
                        style={styles.icon}
                    />
                    <Players
                        actions={actions}
                        rounds={rounds}
                        shouldShowHistory={shouldShowHistory}
                        team1={team1}
                        team2={team2}
                        theme={theme}
                    />
                    <FlatList
                        data={rounds}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({item}) => (
                            <SingleRound
                                item={item}
                                theme={theme}
                            />
                        )}
                        style={styles.flatList}
                    />
                </SafeAreaView>
            </Modal>
        );
    }
}

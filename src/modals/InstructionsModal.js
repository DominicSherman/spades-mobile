import React, {Component} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {instructions, scoring} from '../constants/instructions';
import {getBackgroundColor, getDarkTextColor} from '../services/style-service';

export default class InstructionsModal extends Component {
    _getStyles = () => StyleSheet.create({
        centeredRow: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        headerText: {
            color: getDarkTextColor(this.props.theme),
            fontSize: 25,
            fontWeight: '600'
        },
        icon: {
            color: getDarkTextColor(this.props.theme),
            left: '3%'
        },
        scrollView: {
            height: '100%',
            padding: '3%'
        },
        text: {
            color: getDarkTextColor(this.props.theme),
            fontSize: 20,
            fontWeight: '200'
        },
        wrapper: {
            backgroundColor: getBackgroundColor(this.props.theme),
            marginBottom: '3%',
            paddingLeft: '1%'
        }
    });

    render() {
        const styles = this._getStyles();

        return (
            <Modal
                animationType={'slide'}
                visible={this.props.showInfoModal}
            >
                <SafeAreaView style={styles.wrapper}>
                    <EvilIcons
                        name={'close'}
                        onPress={this.props.onClose}
                        size={30}
                        style={styles.icon}
                    />
                    <ScrollView
                        style={styles.scrollView}
                    >
                        <View style={styles.centeredRow}>
                            <Text style={styles.headerText}>{'Instructions'}</Text>
                        </View>
                        <Text style={styles.text}>
                            {instructions}
                        </Text>
                        <View style={styles.centeredRow}>
                            <Text style={styles.headerText}>{'Scoring'}</Text>
                        </View>
                        <Text style={styles.text}>
                            {scoring}
                        </Text>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}

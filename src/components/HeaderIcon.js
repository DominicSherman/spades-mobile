import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {getHeaderFooterTextColor, getHeaderIconColor} from '../services/style-service';
import {getShadow} from '../constants/shadow-styles';

export default class HeaderIcon extends Component {
    _getStyles = () => StyleSheet.create({
        image: {
            height: '100%',
            tintColor: getHeaderIconColor(this.props.theme),
            width: '100%'
        },
        imageWrapper: {
            height: '100%',
            width: this.props.width
        },
        text: {
            color: getHeaderFooterTextColor(this.props.theme),
            fontFamily: 'ArialRoundedMTBold',
            fontSize: 12,
            fontWeight: '800'
        },
        touchable: {
            paddingLeft: '3%',
            paddingRight: '3%'
        },
        wrapper: {
            alignItems: 'center',
            flexDirection: 'column',
            height: '70%',
            justifyContent: 'space-evenly',
            width: 60,
            ...getShadow(this.props.theme)
        }
    });

    render() {
        const {onPress, icon, text} = this.props;
        const styles = this._getStyles();

        return (
            <Touchable
                onPress={onPress}
                style={styles.touchable}
            >
                <View style={styles.wrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            resizeMode={'contain'}
                            source={icon}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Touchable>
        );
    }
}

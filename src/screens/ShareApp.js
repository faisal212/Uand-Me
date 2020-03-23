/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable import/newline-after-import */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share, I18nManager } from 'react-native';
import ImageLoad from '../common/RnImagePlaceH';
import { Icon } from 'native-base';
import themeStyle from '../common/Theme.style';
export default class rateUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: false
    };
  }
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://play.google.com/store/apps/details?id=${
          this.props.packageName
          }`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return this.props.value === 'menu' ? (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryView}
          onPress={this.onShare}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',

              padding: !this.props.defaultIcons ? I18nManager.isRTL ? 18 : 15 : 13,
              paddingBottom: 10,
              paddingTop: 10,
              alignItems: 'center',
            }}
          >
            {!this.props.defaultIcons ? (
              <ImageLoad
                key={0}
                style={{ width: 25, height: 25, marginRight: 0, paddingLeft: 0 }}
                loadingStyle={{ size: 'large', color: '#557f5f' }}
                placeholder={false}
                ActivityIndicator={true}
                placeholderStyle={{width: 0, height: 0}}
                source={this.props.imageTemp}
              />
            ) : (
                <Icon
                  name={this.props.iconName}
                  size={20}
                  style={{ color: '#4d4d4d', }}
                />
              )}
            <Text style={styles.categoryText}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ width: '100%', height: 1, backgroundColor: '#4d4d4d' }}
        />
      </View>
    ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryView}
          onPress={this.onShare}
        >
          <View style={styles.tabComponents}>
            <Text style={{ fontSize: themeStyle.mediumSize }}>
              {/* { text} */}
              {this.props.text}
            </Text>
            {
              <Icon
                name={this.props.iconName}
                size={20}
                style={{ color: '#4d4d4d' }}
              />
            }
          </View>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  tabComponents: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 13
  },
  categoryText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#4d4d4d',
    fontSize: themeStyle.mediumSize,
    paddingLeft: 10,
    paddingRight: 12
  }
});

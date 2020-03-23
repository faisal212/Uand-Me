/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable import/newline-after-import */
import Rate, { AndroidMarket } from 'react-native-rate';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  I18nManager
} from 'react-native';
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

  render() {
    return this.props.value === 'menu' ? (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryView}
          onPress={() => {
            const options = {
              AppleAppID: this.props.appleId.toString(),
              GooglePackageName: '', // also require changing
              AmazonPackageName: '',
              OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
              preferredAndroidMarket: AndroidMarket.Google,
              preferInApp: true,
              openAppStoreIfInAppFails: true,
              fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html'
            };
            Rate.rate(options, success => {
              if (success) {
                this.setState({ rated: true });
              }
            });
          }}
        >
          <View
style={{ flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    padding: !this.props.defaultIcons
      ? I18nManager.isRTL
        ? 18
        : 15
      : I18nManager.isRTL
      ? 18
      : 11,
    paddingBottom: 10,
    paddingTop: 10 }}
          >
            {!this.props.defaultIcons ? (
              <ImageLoad
                key={0}
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 8,
                  paddingRight: 8
                }}
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
                style={{ color: '#4d4d4d' }}
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
        onPress={() => {
          const options = {
            AppleAppID: this.props.appleId.toString(),
            GooglePackageName: '', // also require changing
            AmazonPackageName: '',
            OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: true,
            openAppStoreIfInAppFails: true,
            fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html'
          };
          Rate.rate(options, success => {
            if (success) {
              this.setState({ rated: true });
            }
          });
        }}
      >
        <View style={styles.tabComponents}>
          <Text>{this.props.text}</Text>
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
    paddingLeft: 7,
    paddingRight: 10
  }
});

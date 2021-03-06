/* eslint-disable import/newline-after-import */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardStyleInterpolators } from 'react-navigation-stack';
import { View, ScrollView, StyleSheet, Linking, Platform } from 'react-native';
import HTML from 'react-native-render-html';
import themeStyle from '../common/Theme.style';
class RefundPolicy extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle');
    return {
      headerTitle: headerStyle,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary,
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? "bold" : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' },
      gestureEnabled: true,
    };
  }
  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson['Refund Policy']
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.tcContainer}>
          <HTML
            onLinkPress={(event, href) => {
              Linking.openURL(href);
            }}
            html={this.props.isLoading.Config.refundPolicy}
            baseFontStyle={{ color: '#000' }}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state
});

export default connect(
  mapStateToProps,
  null
)(RefundPolicy);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: themeStyle.backgroundColor,
    flex: 1
  }
});

/* eslint-disable no-useless-escape */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */

import React, { Component } from 'react';
import AppContainer from './src/navigation/Index';
// eslint-disable-next-line import/imports-first
import SplashScreen from 'react-native-splash-screen';
import WooComFetch from './src/common/WooComFetch';
// eslint-disable-next-line import/imports-first
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
// import { NetworkConsumer } from 'react-native-offline';
import { View, StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
// eslint-disable-next-line no-undef
WIDTH = Dimensions.get('window').width;
// eslint-disable-next-line no-undef
Height = Dimensions.get('window').height;
import theme from './src/common/Theme.style';
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTotal: 0,
      isLoading: true,
      data: ''
    };
  }
  async componentDidMount() {
    console.disableYellowBox = true;
    console.reportErrorsAsExceptions = false;
    const data = await SyncStorage.init();
    console.log('AsyncStorage is ready!', data);
    this.props.saveDefaultCurrency();
    this.props.siteSetting();
    this.props.saveLocalDataIntoArrays();
    this.props.getAllCategories();
    this.props.getBannersData();
    this.props.getFeaturedData(this.props);
    this.props.getOnSaleData(this.props);
    this.props.getNewestData(this.props);
    this.props.getVendorData(this.props);
    this.props.getProductData(this.props);
    this.aboutUsPageGetIds();
    this.setState({ isLoading: false });
  }
componentWillUnmount() {
  this.props.cartItems2.sharedData.deepTemp = false;
}
  aboutUsPageGetIds = () => {
    const ids = `${this.props.cartItems2.Config.about_page_id},${
      this.props.cartItems2.Config.privacy_page_id
    },${this.props.cartItems2.Config.refund_page_id},${
      this.props.cartItems2.Config.terms_page_id
    }`;
    fetch(
      `${this.props.cartItems2.Config.url}/wp-json/wp/v2/pages/?include=${ids}`,
      {
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(data => {
        const d = data;
        for (const value of d) {
          if (this.props.cartItems2.Config.about_page_id === value.id) {
            this.props.cartItems2.Config.aboutUs = value.content.rendered;
          }
          if (this.props.cartItems2.Config.refund_page_id === value.id) {
            this.props.cartItems2.Config.refundPolicy = value.content.rendered;
          }
          if (this.props.cartItems2.Config.terms_page_id === value.id) {
            this.props.cartItems2.Config.termServices = value.content.rendered;
          }
          if (this.props.cartItems2.Config.privacy_page_id === value.id) {
            this.props.cartItems2.Config.privacyPolicy = value.content.rendered;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    this.state.isLoading === false
      ?
      SplashScreen.hide()
      :
      null;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar
          backgroundColor={theme.StatusBarColor}
          barStyle={theme.barStyle}
        />
        {this.state.isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
         
          </View>
        ) : (
          <AppContainer />
        )}
      </View>
    );
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Height * 0.04 : 0;
/// ////////////////////////////////////////////////
const mapDispatchToProps = dispatch => ({
  addItemToCart: (productObject, productQuantity, varr) => {
    dispatch({
      type: 'ADD_TO_CARTS',
      product: productObject,
      cartProductQuantity: productQuantity,
      variation: varr,
      metaData: null
    });
  },

  siteSetting: () => {
    dispatch({
      type: 'siteSetting'
    });
  },
  saveDefaultCurrency: () => {
    dispatch({
      type: 'saveDefaultCurrency'
    });
  },
  saveLocalDataIntoArrays: () => {
    dispatch({
      type: 'SAVE_LOCAL_DATA_INTO_ARRAYS'
    });
  },
  getAllCategories: () => {
    dispatch({
      type: 'GET_ALL_CATEGORIES'
    });
  },

  getBannersData: () => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getAllBanners();
      if (json.status === 'ok') {
        dispatch({
          type: 'ADD_BANNERS',
          payload: json.data
        });
      }
    });
  },
  getFeaturedData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getFeaturedProducts(
        props.cartItems2.Config.productsArguments
      );
      dispatch({
        type: 'ADD_FEATURED',
        payload3: json
      });
    });
  },
  getOnSaleData: props => {
    dispatch(async dispatch => {
      const json2 = await WooComFetch.getOnSaleProducts(
        props.cartItems2.Config.productsArguments
      );
      dispatch({
        type: 'ADD_ONSALE',
        payload2: json2
      });
    });
  },
  getNewestData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getProducts(
        props.cartItems2.Config.productsArguments
      );
      dispatch({
        type: 'ADD_NEWEST',
        payload1: json
      });
    });
  },
  getProductData: props => {
    dispatch(async dispatch => {
      const json = await WooComFetch.getProductsAll(
        props.cartItems2.Config.productsArguments, 1, ''
      );
      dispatch({
        type: 'ADD_Products',
        payload6: json
      });
    });
  },

  getVendorData: props => {
    dispatch(async dispatch => {
      if (props.cartItems2.Config.showVendorInfo) {
        await fetch(
          `${
            props.cartItems2.Config.url
          }/api/reactappsettings/react_get_featured_dokan_vendors_list/?insecure=cool`,
          {
            method: 'GET'
          }
        )
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: 'ADD_VENDORS',
              payload4: data.data
            });
            console.log('dokan is enabled');
          })
          .catch(error => {
            console.log(error);
          });
      } else if (props.cartItems2.Config.showWcVendorInfo) {
        await fetch(
          `${
            props.cartItems2.Config.url
          }/api/reactappsettings/react_get_featured_wcvendors_list/?insecure=cool`,
          {
            method: 'GET'
          }
        )
          .then(response => response.json())
          .then(data => {
            dispatch({
              type: 'ADD_VENDORS',
              payload4: data.data
            });
            console.log('dokan is disable');
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
});
/// ///////////////////////////////////////////////
const mapStateToProps = state => ({
  cartItems2: state
});
/// //////////////////////////////////////////
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  }
});


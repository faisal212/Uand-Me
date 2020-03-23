/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
import { Dimensions } from 'react-native';
WIDTH = Dimensions.get('window').width;
// set card width according to your requirement
cardWidth= WIDTH * 0.3991
// cardWidth= WIDTH * 0.4191 // card width for two and half card
// cardWidth= WIDTH * 0.6191 // one and half
Height = Dimensions.get('window').height;

export default {
  /// /////////////////////////////

  url: 'https://clothingbe.codecloudx.com', //your site URL
  consumerKey: 'ck_0b59849b1e282877d8ec6f83d31612b58fd79a2c', // Your consumer secret
  consumerSecret: 'cs_ee40e2972ce1be208be7729e3fe7386c0b811d6c', // Your consumer secret
  //Banners props except style 2
  autoplay:true,
  autoplayDelay:2,
  autoplayLoop: true,

  ////////////////////////////

  StatusBarColor: '#006EED',
  barStyle: '#0085F1', // dark-content, default

  headerTintColor: '#fff',
  headerIconsColor: '#fff',

  headerCartCounterColor: 'rgba(85,127,95,0.9)',
  headerCartCounterText: '#fff',

  primaryDark: '#233e61',
  primary: '#0085F1',
  primaryLight: '#d8dfed',
  // backgroundColor: '#F2F2F2',// color for card style 11
  backgroundColor: '#ffffff',

  google: '#dd4b39',
  facebook: '#3b5998',

  // Button Colors

  addToCartBagBtnColor: '#233e61',

  // only apply on card 1 and 2
  addToCartBtnColor: '#121212', 
  addToCartBtnTextColor: '#fff',
  outOfStockBtnColor: '#D81800',
  outOfStockBtnTextColor: '#fff',
  detailsBtnColor: '#121212',
  detailsBtnTextColor: '#fff',

  //////////////////////////////////////

  removeBtnColor: '#D81800',
  removeBtnTextColor: '#fff',

  wishHeartBtnColor: '#121212',// only apply on card 1 and 2

  otherBtnsColor: '#121212',
  otherBtnsText: '#fff',

// only apply on card 1 and 2
  saleBackgroundColor: '#0085F1',
  saleTextColor: '#fff',
  featuredBackgroundColor: '#0085F1',
  featuredTextColor: '#fff',
  newBackgroundColor: '#D81800',
  newTextColor: '#fff',
  priceColor: '#000',

  //////////////////////////////////////


  /// ///////// font size

  largeSize: 16,
  mediumSize: 14,
  smallSize: 12,

  /// //////// cartWidth
  singleRowCardWidth: cardWidth,
  twoRowCardWIdth: 0.465,
  loadingIndicatorColor: '#0085F1'
  /// ////////////////////////////////////////////////////////////////////////////
};

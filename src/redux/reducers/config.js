/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/imports-first */
/* eslint-disable import/newline-after-import */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable default-case */

import SyncStorage from 'sync-storage';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import * as global from '../../common/GlobalLanguageJson';
/* eslint-disable no-param-reassign */
import theme from '../../common/Theme.style';
const initialState = {
  languageJson: SyncStorage.get('languageCode') === 'en' ? global.a2 : SyncStorage.get('languageCode') === 'ar' ? global.a1 : null,
  url: theme.url.startsWith('https') ? theme.url : theme.url.replace('http', 'https'),
  bannersUrl: `${theme.url.startsWith('https') ? theme.url : theme.url.replace('http', 'https')}/api/reactappsettings/react_get_all_banners/?insecure=cool`,
  consumerKey: theme.consumerKey, // Your consumer secret
  consumerSecret: theme.consumerSecret, // Your consumer secret
  showIntroPage: 1, // show/hide intro page value 1 for show, 0 for hide
  appInProduction: false, //////////////////////////////////////////////////////////////////////// in production
  languageCode: SyncStorage.get('languageCode'), //default language of app
  languageDirection: SyncStorage.get('languageDirection'), //default direction of app
  appDirection: SyncStorage.get('languageDirection'), // application direction
  currency: SyncStorage.get('currency'),
  productsArguments: Object.create({
    lang: I18nManager.isRTL ? 'ar' : 'en',
    currency: SyncStorage.get('currencyCode'),
  }), //additional product arguments for query


  langId: '1',
  loader: 'dots',
  newProductDuration: 20,
  cartButton: 1, //1 : show and 0 : hide
  card_style: 1,
  banner_style: 1,
  currencyPos: SyncStorage.get('currencyPos'),
  address: '',
  fbId: '',
  email: '',
  latitude: '',
  longitude: '',
  phoneNo: '',
  notifText: '',
  notifTitle: '',
  notifDuration: '',
  footerShowHide: '',
  homePage: 1,
  categoryPage: 1,
  siteUrl: '',
  appName: '',
  packgeName: 1,
  introPage: 1,
  myOrdersPage: 1,
  newsPage: 1,
  wishListPage: 1,
  shippingAddressPage: 1,
  aboutUsPage: 1,
  contactUsPage: 1,
  editProfilePage: 1,
  settingPage: 1,
  rateApp: 1,
  shareApp: 1,
  fbButton: 1,
  googleButton: 1,
  notificationType: '',
  privacyPolicy: '',
  termServices: '',
  aboutUs: '',
  refundPolicy: '',
  filterMaxPrice: 1000,
  guestCheckOut: true,
  checkOutPage: 1,
  defaultIcons: false,
  orderCancelButton: false,
  addressPage: true,
  downloadPage: true,
  cancelOrderTime: 0,
  showVendorInfo: false, //for dokan plugin
  showWcVendorInfo: false,
  multiLanguage: false,
  multiCurrency: false,
  appSettings: {},
  enableGeoFencing: false,
  enableDeliveryTracking: false,
  enableWpPointReward: false,
  trackingUrl: '',
  currentSettings: 1,
  about_page_id: 286,
  privacy_page_id: 286,
  refund_page_id: 286,
  terms_page_id: 286,
  vendorEnable: '0'
};
/////////////////////////////////////////////
firstSetting = () => { // 1
  if (SyncStorage.get('languageCode') === undefined) {
    if (I18nManager.isRTL) {
      SyncStorage.set('languageCode', 'ar');
      SyncStorage.set('currencyPos', 'right');
      SyncStorage.set('languageDirection', 'rtl');
    } else {
      SyncStorage.set('languageCode', 'en');
      SyncStorage.set('currencyPos', 'right');
      SyncStorage.set('languageDirection', 'ltr');
    }
    SyncStorage.set('currency', '&#36;');
    SyncStorage.set('currencyCode', 'USD');
    SyncStorage.set('decimals', 2);
    SyncStorage.set('defaultIcons', false);
    SyncStorage.set('cartProducts', null);
  }
};

siteSetting = (state) => {  //2
  const val = SyncStorage.getAllKeys().includes('appSettings');
  if (val === false) {
    state.appSettings = {
      currency_symbol: 'RS',
      new_product_duration: '20',
      lazzy_loading_effect: 'android',
      footer_button: '1',
      cart_button: 1,
      banner_style: 1,
      home_style: 1,
      wish_list_page: '1',
      edit_profile_page: '1',
      shipping_address_page: '1',
      my_orders_page: '1',
      contact_us_page: '1',
      about_us_page: '1',
      news_page: '1',
      intro_page: '1',
      setting_page: '1',
      share_app: '1',
      rate_app: '1',
      category_style: '1',
      sidebar_menu_icon: '0',
      downloads: '1',
      bill_ship_info: '1',
      wpml_enabled: '0',
      wp_multi_currency: '0',
      mvf_enabled: '0',
      geo_fencing: '0',
      delivery_tracking: '0',
      wp_point_reward: '0',
      update_order: 1,
      fbButton: 1,
      about_page_id: 286,
      privacy_page_id: 286,
      refund_page_id: 286,
      terms_page_id: 286
    };
    this.storeData(state.appSettings);
  } else {
    state.appSettings = JSON.parse(SyncStorage.get('appSettings'));
  }
  this.defaultSettings(state);
};


storeData = (state) => {
  SyncStorage.set('appSettings', JSON.stringify(state));
};


aboutUsPageGetIds = (state) => {
  // eslint-disable-next-line prefer-const
  let ids = `${state.about_page_id},${state.privacy_page_id},${state.refund_page_id},${state.terms_page_id}`;
  fetch(`${state.url}/wp-json/wp/v2/pages/?include=${ids}`, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const d = data;
      for (const value of d) {
        if (state.about_page_id === value.id) { console.log(value.content.rendered); state.aboutUs = value.content.rendered; }
        if (state.refund_page_id === value.id) { console.log(value.content.rendered); state.refundPolicy = value.content.rendered; }
        if (state.terms_page_id === value.id) { console.log(value.content.rendered); state.termServices = value.content.rendered; }
        if (state.privacy_page_id === value.id) { console.log(value.content.rendered); state.privacyPolicy = value.content.rendered; }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
defaultSettings = (state) => { //0
  console.log('defaultSettings');
  console.log(state.appSettings)
  state.homePage = parseInt(state.appSettings.home_style);
  state.categoryPage = parseInt(state.appSettings.category_style);
  state.introPage = parseInt(state.appSettings.intro_page);
  state.myOrdersPage = parseInt(state.appSettings.my_orders_page);
  state.latitude = parseFloat(state.appSettings.Latitude);
  state.longitude = parseFloat(state.appSettings.Longitude);
  state.newsPage = parseInt(state.appSettings.news_page);
  state.wishListPage = parseInt(state.appSettings.wish_list_page);
  state.shippingAddressPage = parseInt(state.appSettings.shipping_address_page);
  state.aboutUsPage = parseInt(state.appSettings.about_us_page);
  state.contactUsPage = parseInt(state.appSettings.contact_us_page);
  state.editProfilePage = parseInt(state.appSettings.edit_profile_page);
  state.fbButton = parseInt(state.appSettings.facebook_login);
  state.orderCancelButton = (state.appSettings.cancel_order_button === '1');
  state.address = `${state.appSettings.address}, ${state.appSettings.city}, ${state.appSettings.state} ${state.appSettings.Zip}, ${state.appSettings.Country}`;
  state.trackingUrl = state.appSettings.tracking_url;
  state.email = state.appSettings.contact_us_email;
  state.phoneNo = state.appSettings.phone_no;
  state.cancelOrderTime = parseInt(state.appSettings.cancel_order_hours);
  state.about_page_id = parseInt(state.appSettings.about_page_id);
  state.privacy_page_id = parseInt(state.appSettings.privacy_page_id);
  state.refund_page_id = parseInt(state.appSettings.refund_page_id);
  state.terms_page_id = parseInt(state.appSettings.terms_page_id);
  state.settingPage = parseInt(state.appSettings.setting_page);
  state.cartButton = parseInt(state.appSettings.card_style) === 1 ? true : false;
  state.card_style = parseInt(state.appSettings.card_style);
  state.banner_style = parseInt(state.appSettings.banner_style);
  state.footerShowHide = parseInt(state.appSettings.footer_button);
  state.addressPage = (state.appSettings.bill_ship_info == '1');
  state.downloadPage = (state.appSettings.downloads == '1');
  state.multiLanguage = (state.appSettings.wpml_enabled === '1');
  state.siteUrl = state.appSettings.site_url;
  state.checkOutPage = parseInt(state.appSettings.one_page_checkout);
  state.multiCurrency = (state.appSettings.wp_multi_currency === '1');
  state.showVendorInfo = (state.appSettings.mvf_enabled == '1');
  state.showVendorInfo = (state.appSettings.mvf_enabled == '1');
  state.showWcVendorInfo = (state.appSettings.mvf_enabled == '2');
  state.vendorEnable = state.appSettings.mvf_enabled;
  state.enableGeoFencing = (state.appSettings.geo_fencing == '1');
  state.enableDeliveryTracking = (state.appSettings.delivery_tracking == '1');
  state.enableWpPointReward = (state.appSettings.wp_point_reward == '1');
  state.rateApp = parseInt(state.appSettings.rate_app);
  state.shareApp = parseInt(state.appSettings.share_app);
  state.defaultIcons = state.appSettings.sidebar_menu_icon != '1';/////////////////////////////////////////////
  SyncStorage.set('defaultIcons', state.appSettings.sidebar_menu_icon != '1');
  state.currentSettings = state.appSettings.update_order;
  this.checkingNewSettingsFromServer(state);
};

checkingNewSettingsFromServer = (state) => { // 
  fetch(`${state.url}/api/reactappsettings/react_get_all_settings/?insecure=cool`, {
    method: 'GET'
  })
    .then((response) => response.json())
    .then((responseJson) => {
      const settings = responseJson;
      state.address = `${settings.address}, ${settings.city}, ${settings.state} ${settings.Zip}, ${settings.Country}`;
      state.email = settings.contact_us_email;
      state.latitude = settings.Latitude;
      state.longitude = settings.Longitude;
      state.phoneNo = settings.phone_no;
      state.newProductDuration = settings.new_product_duration;
      state.notifText = settings.notification_text;
      state.notifTitle = settings.notification_title;
      state.notifDuration = settings.notification_duration;
      state.packgeName = state.appSettings.package_name;
      state.appName = settings.app_name;
      state.about_page_id = parseInt(settings.about_page_id);
      state.privacy_page_id = parseInt(settings.privacy_page_id);
      state.refund_page_id = parseInt(settings.refund_page_id);
      state.terms_page_id = parseInt(settings.terms_page_id);
      state.fbButton = parseInt(settings.facebook_login);
      state.latitude = parseFloat(settings.Latitude);
      state.longitude = parseFloat(settings.Longitude);
      state.siteUrl = state.appSettings.site_url;
      state.filterMaxPrice = parseInt(settings.filter_max_price);
      state.guestCheckOut = (settings.checkout_process == 'yes');
      state.checkOutPage = parseInt(settings.one_page_checkout);
      state.orderCancelButton = (settings.cancel_order_button == '1');
      state.cancelOrderTime = parseInt(settings.cancel_order_hours);
      state.trackingUrl = settings.tracking_url;

      this.reloadingWithNewSettings(state, settings);
      // }
      this.aboutUsPageGetIds(state);
    })
    .catch((error) => {
      console.log(error);
    });
};
reloadingWithNewSettings = (state, data) => {
  this.storeData(data);
  if (state.currentSettings != data.update_order) { // check
    if (data.wp_multi_currency === '0') this.restoreDefaultCurrency(state);
    console.log('Reloading App Please Wait!', 'New Updates Received');
    // alert('Reloading App Please Wait! \n New Updates Received');
    // setTimeout(() => {
    //   RNRestart.Restart();
    // }, 200);
  }
};
//Subscribe for local notification when application is start for the first time
setLocalNotification = (state) => {
  state.platform.ready().then(() => {
    state.storage.get('localNotification').then((val) => {
      if (val == undefined) {
        state.storage.set('localNotification', 'localNotification');
        state.localNotifications.schedule({
          id: 1,
          title: state.notifTitle,
          text: state.notifText,
          every: state.notifDuration,
        });
      }
    });
  });
};
saveDefaultCurrency = () => {
  console.log('saveDefaultCurrency');
  if (SyncStorage.get('appStartFirstTime') === undefined) {
    SyncStorage.set('currencyDefault', SyncStorage.get('currency'));
    SyncStorage.set('currencyCodeDefault', SyncStorage.get('currencyCode'));
    SyncStorage.set('currencyPosDefault', SyncStorage.get('currencyPos'));
    SyncStorage.set('decimalsDefault', SyncStorage.get('decimals'));
    SyncStorage.set('defaultIcons', false);
    SyncStorage.set('appStartFirstTime', 'started');
    SyncStorage.set('customerData', '');
    SyncStorage.set('gustLogin', false);
  }
};
restoreDefaultCurrency = () => {
  if (SyncStorage.get('appStartFirstTime') === 'started') {
    SyncStorage.set('currency', SyncStorage.get('currencyDefault'));
    SyncStorage.set('currencyCode', SyncStorage.get('currencyCodeDefault'));
    SyncStorage.set('currencyPos', SyncStorage.get('currencyPosDefault'));
    SyncStorage.set('decimals', SyncStorage.get('decimalsDefault'));
    SyncStorage.set('defaultIcons', false);
  }
};

const Config = (state = initialState, action) => {
  switch (action.type) {
    case 'siteSetting':
      state.languageJson = SyncStorage.get('languageCode') === 'en' ? global.a2 : SyncStorage.get('languageCode') === 'ar' ? global.a1 : null;
      state.productsArguments = Object.create({
        lang: SyncStorage.get('languageCode'),
        currency: SyncStorage.get('currencyCode'),
      }); //additional product arguments for query
      // productsArguments: , //additional product arguments for query
      this.siteSetting(state);
      return {
        languageJson: state.languageJson,
        url: state.url,
        bannersUrl: state.bannersUrl,
        consumerKey: state.consumerKey,
        consumerSecret: state.consumerSecret,
        showIntroPage: state.showIntroPage, // show/hide intro page value 1 for show, 0 for hide
        appInProduction: state.appInProduction,
        languageCode: state.languageCode, //default language of app
        languageDirection: state.languageDirection, //default direction of app
        appDirection: state.languageDirection, // application direction
        currency: state.currency,
        productsArguments: state.productsArguments,
        langId: state.langId,
        loader: state.loader,
        newProductDuration: state.newProductDuration,
        cartButton: state.cartButton, //1 : state. show and 0 : state. hide
        card_style: state.card_style,
        banner_style: state.banner_style,
        currencyPos: state.currencyPos,
        address: state.address,
        fbId: state.fbId,
        email: state.email,
        latitude: state.latitude,
        longitude: state.longitude,
        phoneNo: state.phoneNo,
        notifText: state.notifText,
        notifTitle: state.notifTitle,
        notifDuration: state.notifDuration,
        footerShowHide: state.footerShowHide,
        homePage: state.homePage,
        categoryPage: state.categoryPage,
        siteUrl: state.siteUrl,
        appName: state.appName,
        packgeName: state.packgeName,
        introPage: state.introPage,
        myOrdersPage: state.myOrdersPage,
        newsPage: state.newsPage,
        wishListPage: state.wishListPage,
        shippingAddressPage: state.shippingAddressPage,
        aboutUsPage: state.aboutUsPage,
        contactUsPage: state.contactUsPage,
        editProfilePage: state.editProfilePage,
        settingPage: state.settingPage,
        rateApp: state.rateApp,
        shareApp: state.shareApp,
        fbButton: state.fbButton,
        about_page_id: state.about_page_id,
        privacy_page_id: state.privacy_page_id,
        refund_page_id: state.refund_page_id,
        terms_page_id: state.terms_page_id,
        googleButton: state.googleButton,
        notificationType: state.notificationType,
        privacyPolicy: state.privacyPolicy,
        termServices: state.termServices,
        aboutUs: state.aboutUs,
        refundPolicy: state.refundPolicy,
        filterMaxPrice: state.filterMaxPrice,
        guestCheckOut: state.guestCheckOut,
        checkOutPage: state.checkOutPage,
        defaultIcons: state.defaultIcons,
        orderCancelButton: state.orderCancelButton,
        addressPage: state.addressPage,
        downloadPage: state.downloadPage,
        cancelOrderTime: state.cancelOrderTime,
        showVendorInfo: state.showVendorInfo, //for dokan plugin
        showWcVendorInfo: state.showWcVendorInfo,
        vendorEnable: state.vendorEnable,
        multiLanguage: state.multiLanguage,
        multiCurrency: state.multiCurrency,
        appSettings: state.appSettings,
        enableGeoFencing: state.enableGeoFencing,
        enableDeliveryTracking: state.enableDeliveryTracking,
        enableWpPointReward: state.enableWpPointReward,
        trackingUrl: state.trackingUrl,
        currentSettings: state.currentSettings,
      };
    case 'saveDefaultCurrency':
      this.firstSetting();
      this.saveDefaultCurrency(state);
      return {
        languageJson: state.languageJson,
        url: state.url,
        bannersUrl: state.bannersUrl,
        consumerKey: state.consumerKey,
        consumerSecret: state.consumerSecret,
        showIntroPage: state.showIntroPage, // show/hide intro page value 1 for show, 0 for hide
        appInProduction: state.appInProduction,
        languageCode: state.languageCode, //default language of app
        languageDirection: state.languageDirection, //default direction of app
        appDirection: state.languageDirection, // application direction
        currency: state.currency,
        productsArguments: state.productsArguments,
        langId: state.langId,
        loader: state.loader,
        newProductDuration: state.newProductDuration,
        cartButton: state.cartButton, //1 : state. show and 0 : state. hide
        card_style: state.card_style,
        banner_style: state.banner_style,
        currencyPos: state.currencyPos,
        address: state.address,
        fbId: state.fbId,
        email: state.email,
        latitude: state.latitude,
        longitude: state.longitude,
        phoneNo: state.phoneNo,
        notifText: state.notifText,
        notifTitle: state.notifTitle,
        notifDuration: state.notifDuration,
        footerShowHide: state.footerShowHide,
        homePage: state.homePage,
        categoryPage: state.categoryPage,
        siteUrl: state.siteUrl,
        appName: state.appName,
        packgeName: state.packgeName,
        introPage: state.introPage,
        myOrdersPage: state.myOrdersPage,
        newsPage: state.newsPage,
        wishListPage: state.wishListPage,
        shippingAddressPage: state.shippingAddressPage,
        aboutUsPage: state.aboutUsPage,
        contactUsPage: state.contactUsPage,
        editProfilePage: state.editProfilePage,
        settingPage: state.settingPage,
        rateApp: state.rateApp,
        shareApp: state.shareApp,
        fbButton: state.fbButton,
        about_page_id: state.about_page_id,
        privacy_page_id: state.privacy_page_id,
        refund_page_id: state.refund_page_id,
        terms_page_id: state.terms_page_id,
        googleButton: state.googleButton,
        notificationType: state.notificationType,
        privacyPolicy: state.privacyPolicy,
        termServices: state.termServices,
        aboutUs: state.aboutUs,
        refundPolicy: state.refundPolicy,
        filterMaxPrice: state.filterMaxPrice,
        guestCheckOut: state.guestCheckOut,
        checkOutPage: state.checkOutPage,
        defaultIcons: state.defaultIcons,
        orderCancelButton: state.orderCancelButton,
        addressPage: state.addressPage,
        downloadPage: state.downloadPage,
        cancelOrderTime: state.cancelOrderTime,
        showVendorInfo: state.showVendorInfo, //for dokan plugin
        showWcVendorInfo: state.showWcVendorInfo,
        vendorEnable: state.vendorEnable,
        multiLanguage: state.multiLanguage,
        multiCurrency: state.multiCurrency,
        appSettings: state.appSettings,
        enableGeoFencing: state.enableGeoFencing,
        enableDeliveryTracking: state.enableDeliveryTracking,
        enableWpPointReward: state.enableWpPointReward,
        trackingUrl: state.trackingUrl,
        currentSettings: state.currentSettings,
      };

  }
  return state;
};

export default Config;

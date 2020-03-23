/* eslint-disable no-undef */

/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
const initialState = {
  banners: [],
  tab1: [],
  tab2: [],
  tab3: [],
  vendorData: null,
  products: [],
  deepTemp: false
};

const sharedData = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_BANNERS':
        state.banners = action.payload;
      return {
        banners: state.banners,
        tab1: state.tab1,
        tab2: state.tab2,
        tab3: state.tab3,
        vendorData: state.vendorData, 
        products: state.products,
        deepTemp: state.deepTemp
      };
    case 'ADD_NEWEST':
        state.tab1 = action.payload1;
      return {
        banners: state.banners,
        tab1: state.tab1,
        tab2: state.tab2,
        tab3: state.tab3,
        vendorData: state.vendorData,
        products: state.products,
        deepTemp: state.deepTemp  
      };
      case 'ADD_Products':
        state.products = action.payload6;
      return {
        banners: state.banners,
        tab1: state.tab1,
        tab2: state.tab2,
        tab3: state.tab3,
        vendorData: state.vendorData,
        products: state.products,
        deepTemp: state.deepTemp  
      };
    case 'ADD_ONSALE':
      state.tab2 = action.payload2;
      return {
        banners: state.banners,
        tab1: state.tab1,
        tab2: state.tab2,
        tab3: state.tab3,
        vendorData: state.vendorData,
        products: state.products,
        deepTemp: state.deepTemp  
      };
    case 'ADD_FEATURED':
      state.tab3 = action.payload3;
      return {
        banners: state.banners,
        tab1: state.tab1,
        tab2: state.tab2,
        tab3: state.tab3,
        vendorData: state.vendorData,
        products: state.products,
        deepTemp: state.deepTemp  
      };
      case 'ADD_VENDORS':
          state.vendorData = action.payload4;
          return {
            banners: state.banners,
            tab1: state.tab1,
            tab2: state.tab2,
            tab3: state.tab3,
            vendorData: state.vendorData,
            products: state.products,
            deepTemp: state.deepTemp  
          };
  }
  return state;
};

export default sharedData;

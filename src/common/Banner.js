import React, {PureComponent} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import ImageLoad from './RnImagePlaceH';
import Loader from 'react-native-easy-content-loader'
import SwiperBanner2 from '../common/SwiperBanner2'
import SwiperBanner3 from '../common/SwiperBanner3'
import {connect} from 'react-redux'
// const {width} = Dimensions.get('window')
import theme from './Theme.style'
import SwiperFlatList from 'react-native-swiper-flatlist'

class SwiperBanner extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      loading: false,
    }
  }

  bannersRender () {
    return this.props.bannersArray.sharedData.banners.length > 0
      ? this.props.bannersArray.sharedData.banners.map((val, key) => (
          <ImageLoad
            placeholder={false}
            ActivityIndicator={true}
            key={key}
            resizeMode={'cover'}
            style={{width, height: 210}}
            loadingStyle={{
              size: 'large',
              color: theme.loadingIndicatorColor,
            }}
            placeholderStyle={{width: 0, height: 0}}
            source={{
              uri:
                val.banners_image !== undefined
                  ? val.banners_image.toString().startsWith('https')
                    ? val.banners_image.toString()
                    : val.banners_image.toString().replace('http', 'https')
                  : '',
            }}
          />
        ))
      : null
  }

  render () {
    let {loading} = this.state
    if (this.props.bannersArray.sharedData.banners.length > 0) {
      loading = false
    } else {
      loading = true
    }
    return (
      <Loader
        active
        secondaryColor='rgba(208, 205, 205, 1)'
        primaryColor='rgba(218, 215, 215, 1)'
        animationDuration={400}
        loading={loading}
        containerStyles={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          width: WIDTH,
          shadowOffset: {width: 1, height: 1},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          elevation: 3,
          alignSelf: 'center',
          paddingTop: 0,
          marginTop: 0,
        }}
        pRows={0}
        titleStyles={{
          height: 200,
          width: WIDTH,
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          {3 === this.props.bannerSelect ? (
            this.props.bannersArray.sharedData.banners.length > 0 ? (
              <SwiperBanner2 props={this.props.bannersArray.sharedData} />
            ) : null
          ) : null}
          {2 === this.props.bannerSelect ? (
            <SwiperBanner3
              props={this.props.bannersArray.sharedData}></SwiperBanner3>
          ) : null}
          {1 === this.props.bannerSelect ? (
            <View style={styles.container}>
              <SwiperFlatList
                autoplay={theme.autoplay}
                autoplayDelay={theme.autoplayDelay}
                autoplayLoop={theme.autoplayLoop}
                index={0}
                showPagination
                paginationDefaultColor={'rgba(0,0,0,0.2)'}
                paginationActiveColor={theme.otherBtnsColor}
                paginationStyleItem={{
                  width: 8,
                  height: 8,
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: -5,
                }}>
                {this.bannersRender()}
              </SwiperFlatList>
            </View>
          ) : null}
          {4 === this.props.bannerSelect ? (
            <View style={styles.container}>
              <SwiperFlatList
                autoplay={theme.autoplay}
                autoplayDelay={theme.autoplayDelay}
                autoplayLoop={theme.autoplayLoop}
                index={0}
                showPagination
                paginationDefaultColor={'rgba(0,0,0,0.2)'}
                paginationActiveColor={theme.otherBtnsColor}
                paginationStyleItem={{
                  width: 15,
                  borderRadius: 5 / 2,
                  height: 7,
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: -5,
                }}>
                {this.bannersRender()}
              </SwiperFlatList>
            </View>
          ) : null}
          {/* ///////////////////////////////////// */}
          {5 === this.props.bannerSelect ? (
            <View style={(styles.container, {marginBottom: 26})}>
              <SwiperFlatList
                autoplay={theme.autoplay}
                autoplayDelay={theme.autoplayDelay}
                autoplayLoop={theme.autoplayLoop}
                index={0}
                showPagination
                paginationActiveColor={theme.otherBtnsColor}
                paginationDefaultColor={'rgba(0,0,0,0.2)'}
                paginationStyleItem={{
                  width: 8,
                  height: 8,
                  margin: 1,
                  marginLeft: 3,
                  marginRight: 3,
                }}
                paginationStyle={{flexDirection: 'row', marginBottom: -20}}>
                {this.bannersRender()}
              </SwiperFlatList>
            </View>
          ) : null}
          {6 === this.props.bannerSelect ? (
            <View style={styles.container}>
              <SwiperFlatList
                autoplay={theme.autoplay}
                autoplayDelay={theme.autoplayDelay}
                autoplayLoop={theme.autoplayLoop}
                paginationActiveColor={theme.otherBtnsColor}
                paginationDefaultColor={'rgba(0,0,0,0.2)'}
                index={0}
                showPagination
                paginationStyleItem={{width: 6, height: 15, margin: 2}}
                paginationStyle={{
                  flexDirection: 'column-reverse',
                  width: 15,
                  right: 5,
                  top: 22,
                }}>
                {this.bannersRender()}
              </SwiperFlatList>
            </View>
          ) : null}
        </View>
      </Loader>
    )
  }
}

const mapStateToProps = state => ({
  bannersArray: state,
})

export default connect(mapStateToProps, null)(SwiperBanner)

export const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
})

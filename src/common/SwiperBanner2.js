import React, {Component} from 'react'
import {Dimensions, View} from 'react-native'
import theme from './Theme.style'
import ImageLoad from './RnImagePlaceH';
import { connect } from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel'
 class MyCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      labels:
        this.props.props.banners.length > 0 ? this.props.props.banners : [],
      activeSlide: this.props.props.banners.length > 0 ? 0 : 0,
    }
  }
  static getDerivedStateFromProps (props, state) {
    if (props.props.banners.length > 0) {
      return {
        labels: props.props.banners,
      }
    } else {
      return
    }
  }
  _renderItem = ({item, index}) => {
    return (
      <View>

        <ImageLoad
                placeholder={false}
                ActivityIndicator={true}
                key={index}
                resizeMode={'contain'}
                 style={{width: width - 75, height: 183}}
                loadingStyle={{
                  size: 'large',
                  color: theme.loadingIndicatorColor,
                }}
                placeholderStyle={{width: 0, height: 0}}
                source={{
                  uri:
                    item.banners_image !== undefined
                      ? item.banners_image.toString().startsWith('https') ? item.banners_image.toString() 
                      : item.banners_image.toString().replace('http', 'https')
                      : ''
                }}
              />
      </View>
    )
  }
  get pagination () {
    const {labels, activeSlide} = this.state
    return (
      <Pagination
        dotsLength={labels.length}
        activeDotIndex={activeSlide}
        dotStyle={{height:2}}
        containerStyle={{backgroundColor: this.props.cartItems2.Config.card_style === 11 
            || this.props.cartItems2.Config.card_style === 12 ?
          "#F2F2F2": theme.backgroundColor,paddingTop: 8, paddingBottom: 2}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: theme.otherBtnsColor,
        }}
        inactiveDotStyle={
          {
            backgroundColor: 'rgba(0,0,0,0.2)',
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }
  render () {
    return (
      <View>
        <Carousel
          ref={c => {
            this._carousel = c
          }}
          loop={theme.autoplayLoop}
          autoplay={theme.autoplay}
          autoplayDelay={theme.autoplayDelay * 1000}
          autoplayInterval={3000}
          layout={'default'}
          data={this.state.labels}
          firstItem={this.props.props.banners.length > 0 ? 0 : 0}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />
        {this.pagination}
      </View>
    )
  }
}
export const {width, height} = Dimensions.get('window')
const horizontalMargin = 20
const slideWidth =Dimensions.get('window').width * 0.6789 
const sliderWidth = Dimensions.get('window').width 
const itemWidth = slideWidth + horizontalMargin * 2

const mapStateToProps = state => ({
  cartItems2: state
});
/// //////////////////////////////////////////
export default connect(mapStateToProps, null)(MyCarousel);
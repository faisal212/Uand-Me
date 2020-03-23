import React from "react";
import {
  Animated,
  Dimensions
} from "react-native";
import ImageLoad from './RnImagePlaceH';
import {
  ParallaxSwiper,
  ParallaxSwiperPage
} from './index';
import theme from './Theme.style'
const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  myCustomAnimatedValue = new Animated.Value(0);

  getPageTransformStyle = index => ({
    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        })
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8),
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: ["180deg", "0deg", "-180deg"],
          extrapolate: "clamp"
        })
      }
    ]
  });

  render() {
    return (
   <ParallaxSwiper
        speed={0.5}
        animatedValue={this.myCustomAnimatedValue}
        dividerWidth={8}
        dividerColor={'black'}
        backgroundColor="black"
        onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
        showProgressBar={true}
        progressBarBackgroundColor="rgba(0,0,0,0.25)"
        progressBarValueBackgroundColor={theme.otherBtnsColor}
        progressBarThickness={4}
      >
      {this.props.props.banners.length > 0 ? (
            this.props.props.banners.map((val, key) => (
              <ParallaxSwiperPage
              scrollToIndex={0}
              BackgroundComponent={
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
                      ? val.banners_image.toString().startsWith('https') ? val.banners_image.toString() 
                      : val.banners_image.toString().replace('http', 'https')
                      : ''
                }}
              />
              }
            />

            ))
        ) : 
        null}
      </ParallaxSwiper>
    );
  }
}

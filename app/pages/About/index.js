import React,{Component} from 'react';
import  {
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ProgressBarAndroid,
    Linking,
    Dimensions,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';
let {height, width} = Dimensions.get('window');

class AboutPage extends React.Component {

    constructor(props) {
        super(props);
        const {navigator} = this.props;
    }



    _onBackClick(navigator){

      if(navigator) {
          navigator.pop();
        }
    }


    _onLinkClick(url){
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }


    render() {
      const {navigator} = this.props;
      return (
              <View style={{flex :1}}>
                <View style = {styles.headerBar}>
                  <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
                    <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                  </TouchableHighlight>
                  <Text style = {styles.headerText}>关于</Text>
                </View>
                
              </View>
      );
    }
}

const styles = StyleSheet.create({
  iconImage: {
    height: 30,
    margin: 4,
    width: 30
  },
  headerBar: {
    backgroundColor: '#27B5EE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  }
});
export default AboutPage;

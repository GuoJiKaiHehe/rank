import React,{Component} from 'react';
import {
    View,
    BackAndroid,
    Dimensions,
    TouchableHighlight,
    LayoutAnimation,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    Image,
    StyleSheet,
    Text,
    BackHandler
} from 'react-native';
var {width,height} = Dimensions.get("window");

class ImageDetail extends Component{
	constructor(props) {
	  super(props);
	 this.image=props.image;
	  this.state = {
	  	w:new Animated.Value(0.5),
	  	h:new Animated.Value(0.5)
	  };
	}
	componentWillMount(){
		LayoutAnimation.spring();
		BackHandler.addEventListener("hardwareBackPress",this.onBackAndroid.bind(this))
	}
	componentWillUnmount(){
		BackHandler.removeEventListener('hardwareBackPress',this.onBackAndroid.bind(this))
	}
	onBackAndroid(){
		if(this.props.navigator.getCurrentRoutes().length>0){
			this.props.navigator.pop();
			return true;
		}
		return false;
	}
	componentDidMount(){
		console.log(this.props.image,"this.props.image");
		Animated.timing(this.state.w,{
			duration:500,
			toValue:width*1,
			easing:Easing.linear
		}).start();
		Animated.timing(this.state.h,{
			duration:500,
			toValue:height*1,
			easing:Easing.linear
		}).start();
	}
	_onBackClick(){
		if(this.props.navigator){
			this.props.navigator.pop();
		}
	}
	render(){
		return (
				<View style={{flex:1}}>
					<View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
						<TouchableWithoutFeedback onPress={()=>this._onBackClick()}>
							<Animated.Image style={{height:this.state.h,width:this.state.w}} source={{uri:this.image.url}} >
							</Animated.Image>
						</TouchableWithoutFeedback>
					</View>
				</View>
			);
	}
}
var styles=StyleSheet.create({
	
})
export default ImageDetail;
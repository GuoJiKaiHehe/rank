import React,{Component} from 'react';

import {
	View,
	ActivityIndicator,
	StyleSheet,
	Dimensions,
	Text
} from 'react-native';

class Loading extends Component{
	
	render(){
		return (
				<View style={styles.footerContainer}>
					<ActivityIndicator size="small" color="#3e9ce9" />
					<Text style={styles.LoadingText}>{this.props.title?this.props.title:''}</Text>
				</View>
			);
	}
}
var width=Dimensions.get("window").width;
var styles=StyleSheet.create({
	footerContainer:{
		height:30,
		width:width,
	},
	LoadingText:{
		textAlign:"center"
	}
})
export default Loading;
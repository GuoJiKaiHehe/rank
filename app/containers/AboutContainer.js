import React,{ Component} from 'react';

import {
	Text,
	View,
	DrawerLayoutAndroid,
	TouchableHighlightt,
	Dimensions,
	ScrollView,
	RefreshControl,
	BackAndroid,
	Platform,
	Image,
} from 'react-native';
import {connect} from 'react-redux';
import AboutPage from '../pages/About/index';
class About extends Component{
	render(){
		return (
			<AboutPage {...this.props} />
			);
	}
}
var mapStateToProps=function(state){
	var {read} = state;
	return {
		read
	}
}
export default connect(mapStateToProps)(About);
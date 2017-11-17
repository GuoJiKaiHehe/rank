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

import FuliPage from '../pages/Fuli';
class FuliContainer extends Component{
	render(){
		return (
			<FuliPage {...this.props} />
			);
	}
}
var mapStateToProps=function(state){
	return state;
}
export default connect(mapStateToProps)(FuliContainer);
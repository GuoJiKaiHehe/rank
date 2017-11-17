import React,{ Component} from 'react';

import {
	Text,
	View,
	DrawerLayoutAndroid,
	TouchableHighlightt,
	Dimensions,
	ScrollView,
	RefreshControl,
	Platform,
	Image,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import {connect} from 'react-redux';

import Home from './Home';

import FuliContainer from './FuliContainer';
import codePush from "react-native-code-push";
console.log(codePush);
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
class App extends Component{
	componentDidMount(){
		// console.log(this.props);
	}
	_renderScene(route,navigator){
		var Com=route.component;
		return <Com {...route.params}  navigator={navigator} />
	}
	componentDidMount(){
		codePush.sync({
		  deploymentKey: 'uq4sJLYa_8byqW6aYRYiEAFGFNl50191841f-989c-4092-9003-1cff186c10f4',
		  updateDialog: {
		    optionalIgnoreButtonLabel: '稍后',
		    optionalInstallButtonLabel: '后台更新',
		    optionalUpdateMessage: 'Rank有新版本了，是否更新？',
		    title: '更新提示'
		  },
		  installMode: codePush.InstallMode.ON_NEXT_RESTART
		});	
	}
	render(){
	    let name = 'Home';
	    let home = Home;
		return (
			<Navigator
				initialRoute={{ name: name, component: Home }}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
				renderScene={this._renderScene}
			/>
			);
	}
}
var mapStateToProps=function(state){
	return state;
}
App = codePush(codePushOptions)(App);


export default  connect(mapStateToProps)(App);
import React,{ Component} from 'react';

import {
	Text,
	BackHandler,
	Image,
	View,
	StyleSheet,
	Dimensions,
	Platform,
	DrawerLayoutAndroid,
	TouchableHighlight
} from 'react-native';
import Drawer from 'react-native-drawer';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ArticleList from './ArticleList';
var {width,height} = Dimensions.get('window');
import FuliContainer from './FuliContainer';
import AboutContainer from './AboutContainer';
import {connect} from 'react-redux';
import NavigatorBar from '../components/NavigatorBar';
// import 
class Home extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.navigator=this.props.navigator;
	}
	componentDidMount(){
		/*if(Platform.OS=='ios'){
			this.refs.drawer.open();
		}else{
			this.refs.drawer.openDrawer()
		}*/
		// console.log(this.props);
		BackHandler.addEventListener("hardwareBackPress",this.onBackAndroid.bind(this));
	}
	componentWillUnmount(){
		BackHandler.removeEventListener("hardwareBackPress",this.onBackAndroid.bind(this));
	}
	onBackAndroid(){
		var {navigator}= this.props;
		const routes=navigator.getCurrentRoutes();
		if(routes.length>1){
			navigator.pop();
			return true;
		}
		return false;
	}
	_onClick(tab){
		switch(tab){
			case 'home':
				this.clickHome();
				break;
			case 'about':
				this.clickAbout();
				break;
			case 'fuli':
				this.clickFuli();
				break;
		}
	}
	_onMenuClick(){
		if(Platform.OS=='ios'){
			this.refs.drawer.open();
		}else{
			this.refs.drawer.openDrawer();
		}
	}
	clickHome(){
		if (Platform.OS === 'ios') {
	      this.refs.drawer.close()
	    } else {
	      this.refs.drawer.closeDrawer()
	    }
	}
	clickAbout(){
		if (Platform.OS === 'ios') {
		  this.refs.drawer.close()
		} else {
		  this.refs.drawer.closeDrawer()
		}		
		if(this.props.navigator){
			this.props.navigator.push({
				name:'about',
				component:AboutContainer
			})
		}
	}
	clickFuli(){
		if (Platform.OS === 'ios') {
		  this.refs.drawer.close()
		} else {
		  this.refs.drawer.closeDrawer()
		}		
		if(this.props.navigator){
			this.props.navigator.push({
				name:'fuli',
				component:FuliContainer
			})
		}
	}
	_renderLeftView(){
		return (
			<TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onMenuClick()}>
			    <Image style = {styles.iconImage} source = {require('../images/ic_menu.png')}></Image>
			  </TouchableHighlight>
			);
	}
	render(){
		var navigationView=(
				<View style={styles.container}>
					<Image style={styles.headerImage} source={require("../images/bg_drawer_header.png")}>
						<Text style={styles.titleText}>技术干货&&福利</Text>
					</Image>
					<TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>this._onClick('home')}>
						<View style={styles.item}>
							<Image style={styles.iconHomeImage} source={require("../images/icon_home.png")} />
							<Text style={styles.itemText}>首页</Text>
						</View>
					</TouchableHighlight>				
					<TouchableHighlight style={{marginTop:10}} underlayColor="rgba(34,26,38,0.1)" onPress={()=>this._onClick('fuli')}>
						<View style={styles.item}>
							<Image style={styles.iconHomeImage} source={require("../images/icon_beautiful.png")} />
							<Text style={styles.itemText}>福利</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight style={{marginTop:10}} 
										onPress={()=>this._onClick('about')}
										underlayColor="rgba(34,26,38,0.1)" >
						<View style={styles.item}>
							<Image style={styles.iconHomeImage} source={require("../images/icon_about.png")} />
							<Text style={styles.itemText}>关于</Text>
						</View>
					</TouchableHighlight>
				</View>				
			);
		var content=(
				<View style={{flex:1}}>
					
					<NavigatorBar
						leftView={this._renderLeftView()}
						title={'干货分享'}
						style={{backgroundColor:'#27b5ee'}}
					/>

					<ScrollableTabView style={{flex:1}} 
						tabBarUnderlineColor="white" 
						tabBarInactiveTextColor="#f2f2f2" 
						tabBarBackgroundColor="#27b5ee"
					 	tabBarActiveTextColor="white"
					 	>
						<ArticleList category="Android" tabLabel="安卓" {...this.props} />
						<ArticleList category="iOS" tabLabel="苹果" {...this.props} />
						<ArticleList category="拓展资源" tabLabel="拓展" {...this.props} />
					</ScrollableTabView>					
				</View>
			);
			if(Platform.OS=='ios'){
				return (
					<Drawer
				          ref="drawer"
				          type="overlay"
				          tapToClose={true}
				          openDrawerOffset={0.2}
				          panOpenMask={0.2}
				          tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}
				          content={navigationView}
				          style={drawerStyles}
				          >	
				          {content}
				    </Drawer>					
					);			
			}
			
			return (<DrawerLayoutAndroid
				  ref="drawer"
		          drawerWidth = {width*0.8}
		          drawerPosition = {DrawerLayoutAndroid.positions.Left}
		          renderNavigationView = {() => navigationView}
			>
				{content}
			</DrawerLayoutAndroid>
			);
		
	}
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 10},
}
var styles=StyleSheet.create({
	container:{
		backgroundColor:"#fff",
		flex:1
	},
	headerImage:{
		height:height/5,
		width:width*0.8,
		backgroundColor:"#27b5ee",
		marginBottom:20
	},
	item:{
		height:50,
		alignItems:"center",
		flexDirection:"row",
		backgroundColor:"rgba(34,26,38,0.1)"
	},
	iconHomeImage:{
		height:30,
		margin:8,
		width:30
	},
	itemText:{
		marginLeft:6,
		fontWeight:'bold',
		fontSize:16
	},
	iconImage:{
		height:30,
		margin:4,
		width:30,
	},
	headerBar:{
		backgroundColor:"#27b5ee",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		padding:10
	},
	headerText:{
		fontSize:22,
		color:"white",
		marginLeft:10,
		alignSelf:'center'
	},
	titleText:{
		color:"white",
		fontSize:16,
		textAlign:'center',
		backgroundColor:"transparent",
		margin:80
	}
})
var mapStateToProps=function(state){
	return state;
}
export default connect(mapStateToProps)(Home);





import React,{Component} from 'react';
import {
	Text,
	View,
	Animated,
	Image,
	WebView,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Easing,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';
var {width,height} = Dimensions.get("window");
import Loading from '../components/Loading';
class DetailRead extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isCanBack:false,
	  	progressValue:new Animated.Value(0)
	  };
	}
	componentDidMount(){
		Animated.timing(this.state.progressValue,{
			toValue:width*0.8,
			duration:1500,
			easing:Easing.linear
		}).start();

	}
	_onBackClick(navigator){
		if(this.state.isCanBack){
			this.refs.webview.goBack();			
			return;
		}
		if(navigator){
			navigator.pop();
			
		}
	}
	_onNavigationStateChange(navState){
		console.log(navState,"navState");
		this.setState({
			isCanBack:navState.canGoBack
		});
	}
	_renderLoading(){
		return <Loading />
	}
	_onLoadEnd(){
		console.log("_onLoadEnd")
		this.setState({
			progressValue:width
		})
	}
	render(){
		var {rowData,navigator}= this.props;
		return (
				<View style={{flex:1}}>
					<View style={styles.headerBar}>
						<TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>this._onBackClick(navigator)}>
							<Image source={require("../images/icon_back.png")} style={styles.iconImage} />
						</TouchableHighlight>
						<Text style={styles.headerText} >{rowData.desc}</Text>
					</View>
					{this.state.progressValue==width?
							null
							:
							<Animated.View style={{height:2,backgroundColor:'#27B5EE',width:this.state.progressValue}}>
							</Animated.View>
					}

					<WebView
						ref="webview"
						style={{flex:1}}
						source={{uri:rowData.url}}
						onNavigationStateChange={(navState)=>this._onNavigationStateChange(navState)}
						onLoadEnd={()=>this._onLoadEnd()}
						rernderLoading={this._renderLoading.bind(this)}
					 />
				</View>
			);
	}
}
var styles=StyleSheet.create({
	iconImage:{
		height:30,
		margin:4,
		width:30
	},
	headerBar:{
		backgroundColor:"green",
		flexDirection:"row",
		alignItems:"center",
		padding:10
	},
	headerText:{
		fontSize:22,
		color:"white",
		marginLeft:10,
		paddingRight:20,
		overflow:'hidden'
	}
})
export default DetailRead;
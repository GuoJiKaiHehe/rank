import React,{ Component} from 'react';

import {
	Text,
	View,
	DrawerLayoutAndroid,
	TouchableHighlight,
	Dimensions,
	ScrollView,
	RefreshControl,
	BackAndroid,
	Platform,
	StyleSheet,
	Animated,
	Easing,
	TouchableOpacity,
	
} from 'react-native';

import Image  from 'react-native-image-progress';

var {width,height} = Dimensions.get("window");
import {fetchFuli} from '../../actions/fuli';
import ImageDetail from './ImageDetail';
import LoadingModal from '../../components/LoadingModal';
import NavigatorBar from '../../components/NavigatorBar';
// import Progress from 'react-native-progress/Circle';




class FuliPage extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	progressValue:new Animated.Value(0),
	  	title:"福利"
	  };
	}
	componentWillMount(){
		
		this.fetchData();
	}
	fetchData(){
		var {dispatch} = this.props;
		dispatch(fetchFuli());
	}
	componentDidMount(){
		Animated.timing(this.state.progressValue,{
			toValue:width,
			duration:1500,
			easing:Easing.linear
		}).start();
	}
	_onBackClick(){
		const {navigator} = this.props;
		if(navigator) {
			navigator.pop();
		}
				
	}
	_onImageClick(item,navigator){
		if(item && navigator){
			navigator.push({
				name:'ImageDetail',
				component:ImageDetail,
				params:{
					image:item
				}
			})
		}
	}
	_onRefreshClick(){
		this.fetchData();
	}
	animate() {
	    let progress = 0;
	    this.setState({ progress });
	    setTimeout(() => {
	      this.setState({ indeterminate: false });
	      setInterval(() => {
	        progress += Math.random() / 5;
	        if (progress > 1) {
	          progress = 1;
	        }
	        this.setState({ progress });
	      }, 500);
	    }, 1500);
	  }

	_getImages(items,navigator){
		console.log('_getImages',items);
		return(
			items.map((item,i)=>{
			  return(
			    <TouchableOpacity key = {i}   style={{padding:2}} onPress = {()=>this._onImageClick(item,navigator)}>
			      <Image  key = {i+'_'+item._id} 
			      		   style={{height:parseInt(Math.random() * 20 + 12) * 10,width:(width-8)/2}} 
			      			
			      		   source = {{uri :item.url}}
			      />
			    </TouchableOpacity>

			  )
			})
		)		
	}
	_renderLeftButton(){
		return (
				<TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick()}>
                <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
              </TouchableHighlight>
			);
	}
	_renderRightButton(){
		return (
				<TouchableHighlight style = {{right :0}} underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onRefreshClick()}>
				<Image style = {styles.iconImage}  source = {require('../../images/ic_refresh.png')}></Image>
				</TouchableHighlight>			
			);
	}
	_onLoadImage(){
		console.log('onloadimage');
	}
	render(){
		var {navigator,fuli} = this.props;
		var content;
		if(fuli.loading){
			return  <LoadingModal />
		}else{
			content=(
				<ScrollView>
					<View style={{flexDirection:'row'}}>
						<View>
							{this._getImages(fuli.fuli_list.slice(0,6),navigator)}
						</View>
						<View>
							{this._getImages(fuli.fuli_list.slice(6,12),navigator)}
						</View>
					</View>
				</ScrollView>			
				);			
		}
	
		return (
			<View style={{flex:1}}>
                <NavigatorBar
                	navigator={this.props.navigator}
                	popEnabled={false}
                	leftButton={this._renderLeftButton()}
                	rightButton={this._renderRightButton()}
                	title={this.state.title}
                	style={{backgroundColor:"#27B5EE"}}
                />	
				<Animated.View style = {{height: 2, backgroundColor: '#27B5EE', width: this.state.progressValue}}>
                </Animated.View>  

                <View style={{flex:1}}>
				
               	 {content}
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
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  }
});
var mapStateToProps=function(state){
	return state;
}
export default FuliPage;
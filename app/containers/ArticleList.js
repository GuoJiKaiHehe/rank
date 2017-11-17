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
	Image,
	ListView,
	InteractionManager,
	StyleSheet,
	ProgressBarAndroid
} from 'react-native';
import * as readActions from '../actions/read';
import * as tools from '../common/tools';
import Loading from '../components/Loading';

import DetailRead from './DetailRead';
import LoadingModal from '../components/LoadingModal';
export default class ArticleList extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.dataSource=new ListView.DataSource({
	  		rowHasChanged:(row1,row2)=>row1!==row2
	  })
	}
	componentDidMount(){
		console.log(this.props);
	}
	componentWillMount(){
		this._fetchData();
	}
	_fetchData(){
		InteractionManager.runAfterInteractions(()=>{
			const {dispatch,category} = this.props;
			dispatch(readActions.fetchReads(category));
		})		
	}
	_renderFooter(isFirstLoaded,nowRead){
		if(isFirstLoaded){
			return;
		}
		if(nowRead.noMore){
			return <View><Text>没有更多了</Text></View>
		}else{
			return <Loading title="正在加载..." />
		}
	}
	_onEndReached(nowRead,category){
		if(typeof(nowRead) == 'undefined' || nowRead.isFirstLoaded){
		  return;
		}
		var {category,dispatch} = this.props;
		InteractionManager.runAfterInteractions(()=>{
			dispatch(readActions.fetchReads(category,nowRead.index+1,true,nowRead));
		});
	}
	_onRefresh(){
		// console.log("refreshing");
		this._fetchData();
	}
	_renderRow(rowData,sectionID,rowID,highlightRow){
		console.log('333');
		return (
				<TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onItemClick(rowData,rowID)}>
					<View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
						<View style={{marginLeft:10,flex:1}}>
							<Text style={{fontSize:15,fontWeight:'bold',color:"black"}}>{rowData.desc}</Text>
							<View style={{marginTop: 4, justifyContent: 'space-between', flexDirection: 'row'}}>
							  <Text style={{}}>{'作者：' + rowData.who}</Text>
							  <Text style={{}}>{tools.formatDate(rowData.publishedAt)}</Text>
							</View>							
						</View>
					</View>
				</TouchableHighlight>
			);
	}
	_onItemClick(rowData,rowID){
		var {navigator} = this.props;
		if(navigator){
			navigator.push({
				name:"DetailRead",
				component:DetailRead,
				params:{
					rowData
				}
			})
		}
	}
	render(){
		var {dispatch,read,category} = this.props;
		switch(category){
			case 'Android':
				nowRead=read[0];
				break;
			case 'iOS':
				nowRead=read[1];
				break;
			default:
				nowRead=read[2];
		}
		console.log(nowRead.isRefreshing,"nowRead.isRefreshing",nowRead,category,"category");
		if(nowRead.isFirstLoaded  && nowRead.isRefreshing){
			return <LoadingModal/>
		}
		return (
			<ListView
				enableEmptySections={true}
				style={{flex:1}}
				renderFooter={this._renderFooter.bind(this,nowRead.isFirstLoaded,nowRead)}
				onEndReached={this._onEndReached.bind(this,nowRead,category)}
				renderRow={this._renderRow.bind(this)}
				dataSource={this.dataSource.cloneWithRows(nowRead.articleList)}
				initialListSize={10}
				onEndReachedThreshold={10}
				pageSize={nowRead.articleList.length}
				refreshControl={
					<RefreshControl
						refreshing={nowRead.isRefreshing}
						onRefresh={this._onRefresh.bind(this)}
						colors={['#ff0000','#00ff00','#3ad564']}
						progressBackgroundColor="#fff"
					/>
				}
			/>
			);
	}
	_formatDate(){

	}
}
var styles=StyleSheet.create({
	container:{
		flex:1,
	},
	prgress:{
		marginVertical:20,
		paddingBottom:20,
		alignSelf:'center'
	}
})


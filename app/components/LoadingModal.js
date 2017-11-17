import React,{Component} from 'react';

import {
	Modal,
	View,
	Text,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

class LoadingModal extends Component{
	render(){
		var {size,color} =  this.props; 
		return (
			<View key={'spinner'} style={styles.container}>
		        <View style={[styles.background]}>
		          <View style={styles.loading}>
		            <ActivityIndicator size={size?size:'large'} color={color?color:'#369'} />
		            <Text style={styles.loadingText}>数据加载中...</Text>
		          </View>
		        </View>
		      </View>
			);
	}
}
var styles=StyleSheet.create({
	container:{
		flex:1,
		justifyContent:"center",
		alignItems:'center'
	},
	background:{
		justifyContent:'center',
		alignItems:'center',
		marginTop:100
	},
	loading:{
		flex:1
	},
	loadingText:{
		textAlign:'center'
	}
})
export default LoadingModal;
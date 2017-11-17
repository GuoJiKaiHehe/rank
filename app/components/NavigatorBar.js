import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StatusBar,
	ViewPropTypes,
	StyleSheet,
	Platform,
	Dimensions
} from 'react-native';

const NAV_BAR_HEIGHT_IOS=44;
const NAV_BAR_HEIGHT_ANDROID=50;
const STATUS_BAR_HEIGHT = 20;
const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: PropTypes.any,
    handler: PropTypes.func,
};
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    networkActivityIndicatorVisible: PropTypes.bool,
    showHideTransition:PropTypes.oneOf(['fade', 'slide']),
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    backgroundColor: PropTypes.string,
    animated:PropTypes.bool
};
class NavigatorBar extends Component{
	static defaultProps = {
		statusBar:{
			barStyle:'default',
			hidden:false,
			translucent:false,
			animated:false
		}
	};

	static propTypes= {
		style:ViewPropTypes.style,
		titleLayoutStyle:ViewPropTypes.style,
		navigator:PropTypes.object,
		leftButtonTitle:PropTypes.string,
		popEnabled:PropTypes.bool,
		onLeftButtonClick:PropTypes.func,
		title:PropTypes.string,
		titleView:PropTypes.element,
		hide:PropTypes.bool,
		rightButton:PropTypes.oneOfType([
			PropTypes.shape(ButtonShape),
			PropTypes.element
		]),
		leftButton:PropTypes.oneOfType([
			PropTypes.shape(ButtonShape),
			PropTypes.element			
		])
	};

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	title:"",
	  	popEnabled:true,//是否可以点击左边按钮,
	  	hide:false, //是否隐藏
	  };
	}
	getButtonElement(data={},style){
		return (
				<View style={styles.navBarButton}>
					{(!!data.props)?data: (
						<NavBarButton 
							title={data.title}
							style={data.style}
							tintColor={data.tintColor}
							handler={data.handler}
						/>
						)}
				</View>
			);
	}
	leftView(){
		var leftView=this.props.leftButtonTitle? <Text style={styles.title}>{this.props.leftButtonTitle}</Text>:null;
		return (
				<TouchableOpacity
					onPress={()=>this.onLeftButtonClick()}
				>
					<View style={{width: 50, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
	                    {this.props.leftView ? this.props.leftView : leftView}
	                </View>				
				</TouchableOpacity>
			);
	}
	onLeftButtonClick(){
		if(this.props.popEnabled && this.props.navigator){
			this.props.navigator.pop();
		}
		if (this.props.onLeftButtonClick)this.props.onLeftButtonClick();
	}
	render(){
		var statusBar= !this.props.statusBar.hidden? <View style={styles.statusBar}><StatusBar barStyle="light-content" style={styles.statusBar} /></View>:null;
		var titleView=this.props.titleView? this.props.titleView: <Text style={styles.title} ellipsizeMode="head" numberOfLines={1}>{this.props.title}</Text>	
		var content=this.props.hide? null:(
			<View style={styles.navBar}>
				{this.props.leftButton?this.getButtonElement(this.props.leftButton): this.leftView() }
				<View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
				    {titleView}
				</View>	
				 {this.props.rightButton? this.getButtonElement(this.props.rightButton, {marginRight: 8}): null }				
			</View>
		);		
		return (
		<View style={[styles.container,this.props.style]}>
			{statusBar}
			{content}
		</View>
		);		
	}

}
class NavBarButton extends Component{
	static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        tintColor: PropTypes.string,
        title: PropTypes.string,
        handler: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        title: '',
        tintColor: '#0076FF',
        onPress: () => ({}),
    };
	render(){
		var {style,tintColor,margin,title,handler} = this.props;
		return (
				<TouchableOpacity style={styles.navBarButton} onPress={handler}>
					<View style={style}>
						<Text style={[styles.title,{color:tintColor}]} >{title}</Text>
					</View>
				</TouchableOpacity>
			);
	}
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4caf50',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        // shadowOffset:{
        //     width: 1,
        //     height: 0.5,
        // },
        // shadowColor: '#55ACEE',
        // shadowOpacity: 0.8,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
        // backgroundColor:'blue',
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,

    },
})
export default NavigatorBar;
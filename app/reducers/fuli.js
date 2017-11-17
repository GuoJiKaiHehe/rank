import * as types from '../constants/ActionTypes';
const initialState={
	loading:true,
	isFirstLoaded:true,
	fuli_list:[],
	page:1,
	noMore:false
};

export default function fuli(state=initialState,action){
	switch(action.type){
		case types.FETCH_BEAUTY_LIST:
			return Object.assign({},state,{
				loading:true,
				isFirstLoaded:true,
			})
			break;
		case types.RECEIVE_BEAUTY_LIST:
			return Object.assign({},state,{
				loading:false,
				fuli_list:action.fuli_list,
				isFirstLoaded:false
			})
			break;
		default:
			return state;
	}
}
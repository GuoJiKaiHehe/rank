import * as types from '../constants/ActionTypes';

const initialState = [{
	isRefreshing: true,
	isFirstLoaded: true,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
},{
	isRefreshing: true,
	isFirstLoaded: true,
	loading: false,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
},{
	isRefreshing: true,
	isFirstLoaded: true,
	loading: false,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
}];


export default function read(state=initialState,action){
	switch(action.type){
		case types.FETCH_ARTICLE_LIST:
			 switch(action.category){
					case 'Android':
						state[0].isRefreshing=action.isRefreshing;
						break;
					case 'iOS':
						state[1].isRefreshing=action.isRefreshing;
						break;
					default :
						state[2].isRefreshing=action.isRefreshing

			 }
			 return Object.assign({},state);
			break;
		case types.RECEIVE_ARTICLE_LIST:
			switch(action.category){
					case 'Android':
						state[0].isRefreshing=action.isRefreshing;
						state[0].articleList=action.rankList.results;
						state[0].isFirstLoaded=false;
						break;
					case 'iOS':
						state[1].isRefreshing=action.isRefreshing;
						state[1].articleList=action.rankList.results;
						state[1].isFirstLoaded=false;
						break;
					default :
						state[2].isRefreshing=action.isRefreshing;
						state[2].articleList=action.rankList.results;
						state[2].isFirstLoaded=false;			
			}
			return Object.assign({},state);
			break;
		case types.RECEIVE_ARTICLE_LIST_MORE:
			switch(action.category){
				case 'Android':
					state[0].isRefreshing=action.isRefreshing;
					state[0].articleList=state[0].articleList.concat(action.rankList.results);
					state[0].isFirstLoaded=false;
					state[0].index++;
					break;
				case 'iOS':
					state[1].isRefreshing=action.isRefreshing;
					state[1].articleList=state[1].articleList.concat(action.rankList.results);
					state[1].isFirstLoaded=false;
					state[1].index++;
				default:
					state[2].isRefreshing=action.isRefreshing;
					state[2].articleList=state[2].articleList.concat(action.rankList.results);
					state[2].isFirstLoaded=false;
					state[2].index++;					
			}
			return Object.assign({},state);
			break;

	}
	return state;
}





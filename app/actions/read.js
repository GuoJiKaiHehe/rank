import * as types from '../constants/ActionTypes';

export function fetchReads(category='Android',index=1,isLoadMore,nowRead){
	return dispatch=>{
		if(!isLoadMore){
			dispatch(fetchReadList(category));
		}
		let URL = `http://gank.io/api/data/${category}/10/${index}`;
		console.log(URL);
		fetch(URL).then((res)=>res.json())
				  .then((res)=>{
				  	console.log(res);
				  	if(res.error==false){
						if(!isLoadMore){
							dispatch(receiveReadList(res,category));
						}else{
							dispatch(receiveReadListMore(res,category));
						}
				  	}	
				  	console.log(res.error)
				  }).catch((err)=>{
				  	console.log(err);
				  })
	}
}


function fetchReadList(cate){
	return {
		type:types.FETCH_ARTICLE_LIST,
		category:cate,
		isRefreshing:true
	}
}

function receiveReadList(rankList,cate){
	return {
		type:types.RECEIVE_ARTICLE_LIST,
		category:cate,
		rankList:rankList,
		isRefreshing:false
	}	
}
function receiveReadListMore(rankList,cate){
	return {
		type:types.RECEIVE_ARTICLE_LIST_MORE,
		category:cate,
		rankList:rankList,
		isRefreshing:false
	}
}



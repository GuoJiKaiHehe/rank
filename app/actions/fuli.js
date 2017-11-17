import * as types from '../constants/ActionTypes';

export function fetchFuli(){

	return dispatch=>{
		
		dispatch(fetchFuliList());
		let page=Math.floor(Math.random()*19+1);
		let URL = `http://gank.io/api/data/福利/12/${page}`;
		fetch(URL).then(res=>res.json())
			  .then(resData=>{
			  	console.log(resData)
			  	dispatch(receiveFuliList(resData));
			  })
			  .catch((err)=>{
			  	console.log(err)
			  })		
	}
}
function fetchFuliList(){
	return {
		type:types.FETCH_BEAUTY_LIST,
		loading:true
	}
}

function receiveFuliList(result){
	return {
		type:types.RECEIVE_BEAUTY_LIST,
		loading:false,
		fuli_list:result.results
	}
}
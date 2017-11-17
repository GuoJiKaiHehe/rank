export function formatDate(strTime){
	var date=new Date(strTime);
	return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}
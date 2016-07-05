 
function getCookie(name){
	
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}  
//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name,value,ms){ 
	var exp = new Date();
	exp.setTime(exp.getTime() + ms*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
 

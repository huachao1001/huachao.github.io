 
function getCookie(name){
	
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}  
//�����Ҫ�趨�Զ������ʱ��
//��ô�������setCookie������������������������ok;
//�������
function setCookie(name,value,ms){ 
	var exp = new Date();
	exp.setTime(exp.getTime() + ms*1);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
 

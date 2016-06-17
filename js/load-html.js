//加载最新文章
//#[image name][title][author][time][descript][tags][click]
/*
<div class="news-list">
	<div class="news-img col-xs-5 col-sm-5 col-md-4"> <a target="_blank" href=""><img src="images/logo.jpg" alt=""> </a> </div>
	<div class="news-info col-xs-7 col-sm-7 col-md-8">
	  <dl>
		<dt> <a href="" target="_blank"> 最新文章标题 </a> </dt>
		<dd><span class="name"><a href="" title="由 huachao 发布" rel="author">作者</a></span> <span class="identity"></span> <span class="time"> 2015-10-19 </span></dd>
		<dd class="text">简单摘要</dd>
	  </dl>
	  <div class="news_bot col-sm-7 col-md-8"> <span class="tags visible-lg visible-md"> <a href="">标签</a> <a href="">分类</a> </span> <span class="look"> 点击量：<strong>2126</strong>  </div>
    </div>
</div>

*/
function parseNewestArticle(articlesList){
	var items=articlesList.split("\n");
	var html="";
	for(var i=0;i<items.length;i++){
		var item=items[i];
		
		if(item.startsWith("#")){
			continue;
		}
		var datas=item.split(" ");
		html=html+"<div class=\"news-list\"> <div class=\"news-img col-xs-5 col-sm-5 col-md-4\"> <a target=\"_blank\" href=\"\"><img src=\"images/";
		
		var imageName=datas[0];
		var title=datas[1];
		var author=datas[2];
		var time=datas[3];
		var descript=datas[4];
		var tags=datas[5];
		var click=datas[6];
		console.log("imageName:"+imageName);
		console.log("title:"+title);
		console.log("author:"+author);
		console.log("time:"+time);
		console.log("descript:"+descript);
		console.log("tags:"+tags);
		console.log("click:"+click);
		html=html+imageName+"\" alt=\"\"> </a> </div><div class=\"news-info col-xs-7 col-sm-7 col-md-8\"> <dl>";
		html=html+"<dt> <a href=\"\" target=\"_blank\"> "+title +"</a> </dt>"
		html=html+"<dd><span class=\"name\"><a href=\"\" title=\""+author+"\" rel=\"author\">"+author+"</a></span> <span class=\"identity\"></span> <span class=\"time\"> "+time+" </span></dd>";
		html=html+"<dd class=\"text\">"+descript+"</dd> </dl>";
		
		html=html+"<div class=\"news_bot col-sm-7 col-md-8\"> <span class=\"tags visible-lg visible-md\"> <a href=\"\">"+tags+"</a><a href=\"\">test</a>  </span> <span class=\"look\"> clicks:<strong>"+click+"</strong>  </div></div></div>";
		
		console.log(item);
	}
	return html;
}
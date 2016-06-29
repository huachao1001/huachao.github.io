Bmob.initialize("8bc5db9ed64cdb73292da07fb398e1a3", "2c505b1c4eaa965560bd433c9ae1639c");

function queryArticle(curCategoryId,curPageNo){ 
	var article = Bmob.Object.extend("article");
	var query = new Bmob.Query(article);
	if(curCategoryId!=0){
		query.equalTo("categoryId", curCategoryId);
	}
	query.limit(pageCount);
	query.skip(pageCount*(curPageNo-1));
	var oneItem=$("#HCAricleModel").html();
	var html="";
	// 查询所有数据
	query.find({
		success: function(results) {
			 
			// 循环处理查询到的数据
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				var title=object.get('title');
				var imgUrl=object.get("picUrl");
				var descript=object.get("descript");
				var categoryId=object.get("categoryId");
				var authorUrl=object.get("authorUrl");
				if(!authorUrl){
					authorUrl="";
				} 
				if(!imgUrl){
					imgUrl=genImg(title);
				} 
				var authorName=object.get("authorName");
				var tmpItem=oneItem.replace("${arcitleId}",object.id).replace("${title}",title).replace("${imgUrl}",imgUrl).replace("${descript}",descript).replace("${dateTime}",object.createdAt);
				tmpItem=tmpItem.replace("${category}",_CATEGORY_ID_[categoryId]).replace("${clickCount}",0).replace("${authorName}",authorName).replace("${authorUrl}",authorUrl);
				tmpItem=tmpItem.replace("${c}",categoryId);
				html+=tmpItem; 
			}
			$("#hcNewList").html(html);
		},
		error: function(error) {
			alert("failure: " + error.code + " " + error.message);
		}
	});
}

function queryArticleById(articleId){
	
	var Article = Bmob.Object.extend("article");
	var query = new Bmob.Query(Article);
	query.get(articleId, {
	success: function(article) { 
	$("#articleTitle").html(article.get("title"));
	var hcArticleMarked=HCMarkDown(article.get("content"));
	changeIframeHtml(hcArticleMarked);
	//$("#articleContent").html());
	
  },
  error: function(object, error) {
    // 查询失败
	alert("sorry!");
  }
});
} 


function genPageBar(curPageNo,categoryId){
	var Article = Bmob.Object.extend("article");
	var query = new Bmob.Query(Article);
	query.count({
	  success: function(count) {
		// 查询成功，返回记录数量 
		var totalPage=parseInt( count/pageCount);
		if(count%pageCount!=0){
			totalPage=totalPage+1;
		}
		console.log(totalPage);
		var html="";
		var tmp="";
		var prePageNo= parseInt(curPageNo)-1;
		if(curPageNo<=1){
			tmp= "<span class=\"disabled\" >&lt;&lt;</span><span class=\"disabled\">&lt;</span>";
		}else{ 
			tmp= "<a  href=\"index.html?c="+categoryId+"&pn=1\"  >&lt;&lt;</a><a href=\"index.html?c="+categoryId+"&pn="+prePageNo+"\" >&lt;</a>";
		}
		
		html=html+tmp;
		
		for(var i=1;i<=totalPage;i++){
			if(i==curPageNo){
				tmp="class=\"current\"";
			}else{
				tmp="";
			}
			html=html+"<a href=\"index.html?c="+categoryId+"&pn="+i+"\" "+tmp+">"+i+"</a>";
		}
		 
		var nextPageNo=1+parseInt(curPageNo);
		if(curPageNo<totalPage){
			tmp="<a href=\"index.html?c="+categoryId+"&pn="+nextPageNo+"\"  >&gt;</a><a href=\"index.html?c="+categoryId+"&pn="+(totalPage)+"\">&gt;&gt;</a>";
		}else{
			tmp= "<span  class=\"disabled\"  >&gt;</span><span  class=\"disabled\" >&gt;&gt;</span>";
		}
		
		html=html+tmp;
		$("#HCPage").html(html);
	  },
	  error: function(error) {
		// 查询失败
	  }
	});
}
var hcColors=[ "#6699ff","#99cc33","#ffcc00","#00cc00","#ff9900","#3366cc","#ff6600","#cc0000"];
function genImg(title){
	var canvas = document.createElement('canvas');
	
	canvas.width = 220;
	canvas.height = 144; 
	var color=hcColors[getRandomNum(0,hcColors.length-1)];
	var ctx=canvas.getContext('2d');
	var color=hcColors[getRandomNum(0,hcColors.length-1)];
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var ctx = canvas.getContext("2d");
    ctx.fillRect(0,0,220,144);
    //设置字体样式
    ctx.font = "bold 20px Courier New";
	ctx.fillStyle=color;
 	ctx.fillRect(0,0,220,144);
    //设置字体填充颜色
    ctx.fillStyle = "#ffffff"; 
	ctx.textAlign='center' 
	
	//var width=ctx.measureText(title).width;
	 
	ctx.fillText(title, 110, 72);
	 
	
    
	return canvas.toDataURL("image/png"); 
}

function getRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}  
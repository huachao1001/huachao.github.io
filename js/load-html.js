Bmob.initialize("8bc5db9ed64cdb73292da07fb398e1a3", "2c505b1c4eaa965560bd433c9ae1639c");

function queryArticle(curCategoryId,curPageNo){ 
	var article = Bmob.Object.extend("article");
	var query = new Bmob.Query(article);
	
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
				var authorName=object.get("authorName");
				var tmpItem=oneItem.replace("${arcitleId}",object.id).replace("${title}",title).replace("${imgUrl}",imgUrl).replace("${descript}",descript).replace("${dateTime}",object.createdAt);
				tmpItem=tmpItem.replace("${category}",_CATEGORY_ID_[categoryId]).replace("${clickCount}",0).replace("${authorName}",authorName).replace("${authorUrl}",authorUrl);
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
	$("#articleContent").html(article.get("content"));
	
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
			tmp= "<span class=\"disabled\" >first</span><span class=\"disabled\">pre</span>";
		}else{ 
			tmp= "<a  href=\"index.html?c="+categoryId+"&pn=1\"  >first</a><a href=\"index.html?c="+categoryId+"&pn="+prePageNo+"\" >pre</a>";
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
			tmp="<a href=\"index.html?c="+categoryId+"&pn="+nextPageNo+"\"  >next</a><a href=\"index.html?c="+categoryId+"&pn="+(totalPage)+"\">last</a>";
		}else{
			tmp= "<span  class=\"disabled\"  >next</span><span  class=\"disabled\" >last</span>";
		}
		
		html=html+tmp;
		$("#HCPage").html(html);
	  },
	  error: function(error) {
		// 查询失败
	  }
	});
}
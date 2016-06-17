Bmob.initialize("8bc5db9ed64cdb73292da07fb398e1a3", "2c505b1c4eaa965560bd433c9ae1639c");

function queryArticle(pageNo){ 
	var article = Bmob.Object.extend("article");
	var query = new Bmob.Query(article);
	query.limit(10);
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
				console.log(oneItem);
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
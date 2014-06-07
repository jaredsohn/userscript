// ==UserScript==
// @name            Add Rating Score From Douban To CCNU Library Page
// @description		为华中师大图书馆图书显示页面增加来自豆瓣的评分
// @include         http://202.114.34.15/opac/item.php*
// @author			xieranmaya@gmail.com
// ==/UserScript==

(function(){
	var dblink = document.querySelector("a[href*=douban]");
	var bookisbn = dblink.href.match(/([0-9\-]+)/ig)[0];
	var book_pic = document.getElementById("book_pic");
	GM_xmlhttpRequest({
		method:"get",
		url:"http://api.douban.com/book/subject/isbn/"+bookisbn+"?alt=json",
		onload:function(response){
			var book = JSON.parse(response.responseText);
			//console.log(book);

			var rating = book["gd:rating"]["@average"];

			if(rating=="0")
				rating = "暂无";

			//dblink.innerHTML = dblink.innerHTML + "<div>豆瓣评分："+rating+"</div>"
			book_pic.innerHTML = book_pic.innerHTML + "<div>豆瓣评分："+rating+"</div>";
		}
	});
})();
// ==UserScript==
// @name           AC_quick_comment
// @namespace      AC_quick_comment
// @description    switch between comment-pages without needing to reload the whole page.
// @author         dediggefedde (dediggefedde.deviantart.com)
// @version        1.1
// @include        http://www.animecrazy.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
(function(){

var links=$("div.commentsModule div.commentpagination a");
if(links.length==0)return true;
var count=$("div.commentsModule div.commentpagination .commentcount").html();
var rex=/Showing: \d+-\d+ of (\d+) Comments/i
count=rex.exec(count)[1];
if(count<21)return true;

clickzuweis();
function clickzuweis(){
	links=$("div.commentsModule div.commentpagination a");
	links.attr("onclick","return false;");
	links.click(function(){
		var target=$(this).html();
		var sender= $(this);
		$(this).html("...");
		$.ajax({
			mimeType: "text/html; charset=ISO-8859-1",
			url: $(this).attr("href")
		}).done(function(data){
			var neuc=/<div class="commentsModule">([\s\S]*)<\/div>[\s\S]*?<!-- end of the comments module -->/i.exec(data)[1];
			var commentsid=/commentsid=new Array\(("\d+",?)*\);/i.exec(data)[0];
			var parentsid=/parentsid=new Array\(("\d+",?)*\);/i.exec(data)[0];
			
			var funcs=commentsid+parentsid+/isAllowedToDelete\(\d+,\d+\);[\s\S]*?isAllowedToComment\(\d+,\d+\);/i.exec(data);
			
			$(".commentsModule").html(neuc);
			clickzuweis();
			
			$(".commentsModule").append("<span id='AC_quick_comment_jav'></span>");
			$("#AC_quick_comment_jav").attr("onclick",funcs);
			$("#AC_quick_comment_jav").click();
			$("#AC_quick_comment_jav").remove();
		});
	});
}
})();
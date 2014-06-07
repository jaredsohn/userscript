// ==UserScript==
// @name           douban_ipac
// @namespace      douban_ipac v0.4
// @include        http://www.douban.com/subject/*
// @include        http://www.douban.com/isbn/*
// @author		     moqi@zju.edu.cn
// @thanks         zhx@xmulib.org
// 2009-04-17 Adds links to iPAC in douban right banner menu
// 2009-08-05 little update for douban's display update 
// ==/UserScript==
if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

$(document).ready(function(){
	if ($('#nav a.now span').text() == "读书") {
		// get book title
		var title = $('h1').text();
		//title = encodeURI(title);
		// get book isbn
		$("#info .obmo .pl").each(function(i){
			if ($(this).text() == 'ISBN:'){
			  var isbn = $(this)[0].nextSibling.nodeValue;
			  isbn = isbn.substr(1,13);

				var ShanghaiLink = "http://ipac.library.sh.cn/ipac20/ipac.jsp?index=ISBN&term="+isbn;
				var ZJULink = "http://210.32.137.12/ipac20/ipac.jsp?index=ISSBNEX&term="+isbn;
				var htmlStr = "<div class='gray_ad'><h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2><ul class='bs'>";
				htmlStr += "<li style='border:none'><a href='"+ShanghaiLink+"' target='_blank'>上海图书馆馆藏</a></li>";
				htmlStr += "<li style='border:none'><a href='"+ZJULink+"' target='_blank'>浙江大学图书馆馆藏</a></li>";
				htmlStr += "</ul></div>"
				$(".aside div:eq(0)").after(htmlStr);
        
			}
		});
	}
});
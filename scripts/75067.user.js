// ==UserScript==
// @name           douban_mhlib
// @namespace      douban_mhlib v0.4
// @include        http://book.douban.com/subject/*
// @author		   linxco@gmail.com
// @thanks         moqi@zju.edu.cn zhx@xmulib.org
// ==/UserScript==
if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

$(document).ready(function(){
		// get book title
		var title = $('h1').text();
		//title = encodeURI(title);
		// get book isbn
		$("#info .obmo .pl").each(function(i){
			if ($(this).text() == 'ISBN:'){
			  var isbn = $(this)[0].nextSibling.nodeValue;
			  isbn = isbn.substr(1,13);
				var ShanghaiLink = "http://ipac.library.sh.cn/ipac20/ipac.jsp?profile=g16&index=.TW&term="+title;
				var htmlStr = "<div class='gray_ad'><h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2><ul class='bs'>";
				htmlStr += "<li style='border:none'><a href='"+ShanghaiLink+"' target='_blank'>上海闵行图书馆馆藏</a></li>";
				htmlStr += "</ul></div>"
				$(".aside div:eq(0)").after(htmlStr);
			}
		});
});

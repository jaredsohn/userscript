// ==UserScript==
// @name           douban_ipac
// @namespace      douban_ipac v0.1
// @include        http://www.douban.com/subject/*
// @include        http://www.douban.com/isbn/*
// @author		     moqi@zju.edu.cn
// @thanks         zhx@xmulib.org
// 2011-02-22 Adds links to iPAC in douban right banner menu
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

				var ynuLink = "http://202.203.222.202/cgi-bin/IlaswebBib"+国际标准书/刊号;
				
				var htmlStr = "<div class='gray_ad'><h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2><ul class='bs'>";
				htmlStr += "<li style='border:none'><a href='"+ynuLink+"' target='_blank'>云大图书馆馆藏</a></li>";
				htmlStr += "</ul></div>"
				$(".aside div:eq(0)").after(htmlStr);
        
			}
		});
	}
});
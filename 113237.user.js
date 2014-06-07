// ==UserScript==
// @name						douban_HEU
// @namespace					douban_HEU
// @author						Mescoda on http://mescoda.com/
// @version						1.5
// @description              	Show book holdings in HEU library when browseing Douban.com
// @reason						更新图书馆 OPAC v5.0 服务器移交至图书馆
// @include						http://book.douban.com/subject/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant        				GM_xmlhttpRequest

// ==/UserScript==

function insertfind(title,titleurl) {
	var openLink = "http://202.118.176.18:8080/opac/openlink.php?strSearchType=title&historyCount=1&strText="+titleurl+"&x=0&y=0&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL";
	var htmlStr = "<h2>在图书馆借这本书  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到 哈尔滨工程大学图书馆 搜索 《'+ title +'》</a></div>';
	$(".aside").prepend(htmlStr);
}
	
$(document).ready(function() {
	var title = $('h1 span').text();
	var titleurl = encodeURIComponent(title);
	var isbn = null;
	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);

			setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://liblab.hrbeu.edu.cn/gm/heulib.php?isbn='+isbn,
				onload: function(data) {
					var json = eval('('+data.responseText+')');

					if (json.ok > 0 ){								
						var openLink = 'http://202.118.176.18:8080/opac/openlink.php?strSearchType=isbn&strText='+isbn;
						var htmlStr = '<h2>在哪儿借这本书?  ·  ·  ·  · <span class="pl">(<a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息"> 前往哈尔滨工程大学图书馆 </a>)</span></h2>';
						htmlStr += '<div class="indent">';

						htmlStr += '<ul class="bs">';
						htmlStr += '<li><span style="float:left">&nbsp;&nbsp;索 书 号 : '+json.isbn+'</span></li>';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">馆藏地点 : '+json.data[i].place+'</span><span style="float:right">'+json.data[i].status+'</span></li>';
							} 
						}
						catch (e)
						{
						}
						
						htmlStr += '</ul>';
						htmlStr += '</div>';

						$(".aside").prepend(htmlStr);
					}
					else{
						insertfind(title,titleurl);
					}
				}
			})},500);
		}
	});
	if(isbn == null) insertfind(title,titleurl);
});
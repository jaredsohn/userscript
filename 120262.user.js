// ==UserScript==
// @name			douban_HNIST
// @namespace		douban_HNIST
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v1.2
// @include			http://book.douban.com/subject/*
// @author			Maooyer on http://www.maooyer.com/
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
	var jQuery = unsafeWindow.jQuery;
	var $ = jQuery; 
}

var thisScript = {
	name: "douban_HNIST",
	id: "120262",
	version:"1.2"
}
var updater = new Updater(thisScript);
updater.check(24);

function insertfind(title,titleurl) {
	var openLink = "http://lib.hnist.cn:7788/opac/openlink.php?strSearchType=title&historyCount=1&strText="+titleurl+"&x=0&y=0&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL";
	var htmlStr = "<h2>在图书馆借这本书  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到 湖南理工学院图书馆 搜索 《'+ title +'》</a></div>';
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
				url: 'http://www.maooyer.com/lib/douban_hnist.php?isbn='+isbn,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				},
				onload: function(res) {
					var json = eval('('+res.responseText+')');

					if (json.ok > 0 ){								
						var openLink = 'http://lib.hnist.cn:7788/opac/openlink.php?strSearchType=isbn&strText='+isbn;
						var htmlStr = '<h2>在哪儿借这本书?  ·  ·  ·  · <span class="pl">(<a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息"> 前往湖南理工学院图书馆 </a>)</span></h2>';
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
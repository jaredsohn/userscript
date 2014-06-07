// ==UserScript==
// @name			douban_whu
// @namespace		douban_whu
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			7.0
/* @reason
	change to new server
@end*/
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @author			freefcw@gmail.com
// @thankto			zhx@xmulib.org
// 2009-01-04 Adds Ajax to get book info.
//
// ==/UserScript==
if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_WHU", 
id: "75179", 
version:"7.0" 
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

$(document).ready(function(){
	// get book title
	var title = $('h1').text();
	//title = encodeURI(title);
	// get book isbn
	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			var isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);

			setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://edu.freefcw.com/book.php?school=whu&isbn='+isbn,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(res) {
					//GM_log('ajax finished!status:'+ res.status+res.statusText);
					var json = eval('('+res.responseText+')');

					if (json.ok > 0 ){			
						var openLink = json.href;
						var htmlStr = '<h2>在武大借这本书  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank">武汉大学图书馆馆藏</a></h4>';

						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">'+json.data[i].place + ':' + json.data[i].index + '</span><span style="float:right">'+json.data[i].status+'</span><br style="clear:both"/></li>';
							} 
						}
						catch (e)
						{
						}
						
						htmlStr += '</ul></div></br>';

						$(".aside").prepend(htmlStr);
					}
					else{
						//GM_log('no such book');
						var openLink = 'http://opac.lib.whu.edu.cn';
						var htmlStr = '<h2>在武大借这本书  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><a href='+openLink+' target="_blank">前往武汉大学图书馆</a></div>';
						$(".aside").prepend(htmlStr);
					}
				}
			})},500);
		}
	});

});
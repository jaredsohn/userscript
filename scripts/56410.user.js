// ==UserScript==
// @name			douban_NJU
// @namespace		douban_NJU
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v0.2
/* @reason
	增加功能：图书馆无此书时，会有提示。
@end*/
// @include			http://www.douban.com/subject/*
// @include			http://book.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @include			http://book.douban.com/isbn/*
// @author			lightory@gmail.com
// 2009-01-04 Adds Ajax to get book info.
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_NJU", //脚本名称，请自行修改
id: "56410", //脚本在userscripts.org的id，请自行修改
version:"0.2" // 当前脚本版本号，请自行修改
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

$(document).ready(function(){
	if ($('#nav a.now span').text() == '读书') {
		// get book title
		var title = $('h1').text();
		//title = encodeURI(title);
		// get book isbn
		$("#info .obmo .pl").each(function(i){
			if ($(this).text() == 'ISBN:'){
				var isbn = $(this)[0].nextSibling.nodeValue;
				isbn = isbn.substr(1,13);

				setTimeout(function(){GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.lightory.net/nju/njulib.php?isbn='+isbn,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					},
					onload: function(res) {
						//GM_log('ajax finished!status:'+ res.status+res.statusText);
						var json = eval('('+res.responseText+')');

						if (json.ok > 0 ){			
							var openLink = 'http://202.119.47.8:8080/opac/openlink.php?title=&publisher=&author=&isbn='+isbn+'&series=&callno=&keyword=&year=&doctype=ALL&lang_code=ALL&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL';
							var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank">南京大学图书馆馆藏</a></h4>';

							htmlStr += '<ul class="bs">';
							try
							{
								for (i=0;i<json.ok;i++)
								{
									htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].i+'</span><span style="float:right">'+json.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
								} 
							}
							catch (e)
							{
							}
							
							htmlStr += '</ul></div></br>';

							$(".aside div:eq(0)").after(htmlStr);
						}
						else{
							//GM_log('no such book');
							var openLink = "http://202.114.9.29/search*chx/t?SEARCH="+title;
							var htmlStr = "<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>";
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;">南京大学图书馆中无此书……</h4></div>';
							$(".aside div:eq(0)").after(htmlStr);
						}
					}
				})},500);
			}
		});
	}
});
// ==UserScript==
// @name			douban_NJLib
// @namespace		douban_NJLib
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v0.1
/* @reason
	修复豆瓣页面变动带来的问题，添加了自动更新
@end*/
// @include			http://www.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @author			lightory@gmail.com
// 2009-01-04 Adds Ajax to get book info.
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_NJLib", //脚本名称，请自行修改
id: "58088", //脚本在userscripts.org的id，请自行修改
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
					url: 'http://www.lightory.net/nju/njlib.php?isbn='+isbn,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					},
					onload: function(res) {
						//GM_log('ajax finished!status:'+ res.status+res.statusText);
						var json = eval('('+res.responseText+')');

						if (json.ok > 0 ){			
							var openLink = 'http://ntaleph98.jslib.org.cn/F/?func=find-m&find_base=njl01&adjacent=N&find_code=ISB&request='+isbn;
							var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank">南京图书馆馆藏</a></h4>';

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
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;">南京图书馆中无此书……</h4></div>';
							$(".aside div:eq(0)").after(htmlStr);
						}
					}
				})},500);
			}
		});
	}
});
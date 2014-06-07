// ==UserScript==
// @name			douban_HUST
// @namespace		douban_HUST
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			6.0
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

var thisScript = {
name: "douban_HUST", //脚本名称，请自行修改
id: "39921", //脚本在userscripts.org的id，请自行修改
version:"6.0" // 当前脚本版本号，请自行修改
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

/*
	插入到图书馆也没查找链接
	因为部分图书没有ISBN
	将可能有重复使用的部分抽离出来
*/
function insertfind(title)
{
	var openLink = "http://202.114.9.29/search*chx/t?SEARCH="+title;
	var htmlStr = "<h2>在华工借这本书  ·  ·  ·  ·  ·  · </h2>";
	htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到学校图书馆搜索《'+ title +'》</a></div>';
	$(".aside").prepend(htmlStr);
}
	
$(document).ready(function(){
	// get book title
	var title = $('h1').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;
	//title = encodeURI(title);
	// get book isbn
	$("#info .pl").each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);

			setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://edu.freefcw.com/book.php?school=hust&isbn='+isbn,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				},
				onload: function(res) {
					//GM_log( 'http://acm.hust.edu.cn/getbook.php?isbn='+isbn + ' status:'+ res.status);
					var json = eval('('+res.responseText+')');

					if (json.ok > 0 ){			
						var openLink = 'http://202.114.9.29/search*chx/i?SEARCH='+isbn;
						var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
						htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往华中科技大学图书馆</a></h4>';

						htmlStr += '<ul class="bs">';
						try
						{
							for (i=0;i<json.ok;i++)
							{
								htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].index+'</span><span style="float:right">'+json.data[i].status+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
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
						insertfind(title);
					}
				}
			})},500);
		}
	});
	if(isbn == null) insertfind(title);
});
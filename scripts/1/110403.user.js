/**
 * Created by JetBrains WebStorm.
 * User: Jiang Zhibo
 * Date: 11-8-16
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */
// ==UserScript==
// @name			douban_SHU
// @namespace		douban_SHU
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			v0.1
// @include			http://www.douban.com/subject/*
// @include			http://book.douban.com/subject/*
// @include			http://www.douban.com/isbn/*
// @include			http://book.douban.com/isbn/*
// @author			jzb333@gmail.com
// 2011-08-16 Adds Ajax to get book info.
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery;
}

var thisScript = {
name: "douban_SHU", //脚本名称，请自行修改
id: "37001", //脚本在userscripts.org的id，请自行修改
version:"0.1" // 当前脚本版本号，请自行修改
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
					url: 'http://shu.jiangzhibo.com/shulib.php?isbn='+isbn,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					},
					onload: function(res) {
						//GM_log('ajax finished!status:'+ res.status+res.statusText);
						var json = eval('('+res.responseText+')');

						if (json.ok > 0 ){
							var openLink = 'http://202.120.121.206/ipac20/ipac.jsp?session=13134831JL68N.2084729&menu=search&aspect=basic_search&npp=10&ipp=20&profile=sulz&ri=3&source=202.120.121.206%40%21cnhorizon&index=ISSBNEX&term=" . $isbn . "&x=10&y=13&aspect=basic_search';
							var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank">上海大学图书馆馆藏</a></h4>';

							htmlStr += '<ul class="bs">';
							try
							{
								for (i=0;i<json.ok;i++)
								{
									htmlStr += '<li><span style="float:left">馆址:'+json.data[i].campus+'</span><span style="float:right">馆藏地:'+json.data[i].place+'</span><br /><span style="float:left">索取号:'+json.data[i].hao+'</span><span style="float:right">状态:'+json.data[i].state+'</span><br /><span style="float:left">应还日期:'+json.data[i].back+'</span></li>';
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
							var openLink = 'http://202.120.121.206/ipac20/ipac.jsp?session=13134831JL68N.2084729&menu=search&aspect=basic_search&npp=10&ipp=20&profile=sulz&ri=3&source=202.120.121.206%40%21cnhorizon&index=ISSBNEX&term=" . $isbn . "&x=10&y=13&aspect=basic_search';
							var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
							htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;">上海大学图书馆中无此书……</h4></div>';
							$(".aside div:eq(0)").after(htmlStr);
						}
					}
				})},500);
			}
		});
	}
});

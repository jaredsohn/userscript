// ==UserScript==
// @name          上海大学图书馆豆瓣助手
// @namespace     http://pc.shu.edu.cn/libhelper/search/
// @author        averybigant
// @version	  v0.94
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/
// @exclude       http://music.douban.com/
// @exclude       http://book.douban.com/
// @exclude       http://www.douban.com/*
// @exclude       http://9.douban.com/*
// @exclude       http://*.douban.com/subject/*/edit
// @exclude       http://*.douban.com/subject/*/update_image
// @exclude       http://*.douban.com/subject/*/edit?mine
// @exclude       http://*.douban.com/subject/*/new_version
// @exclude       http://*.douban.com/subject/*/offers
// @exclude       http://*.douban.com/subject/*/new_offer
// @exclude       http://*.douban.com/subject/offer/*/
// @exclude       http://*.douban.com/subject/*/cinema?view=ticket
// @exclude       http://*.douban.com/subject/*/doulists
// @exclude       http://*.douban.com/subject/*/all_photos
// @exclude       http://*.douban.com/subject/*/mupload
// @exclude       http://*.douban.com/subject/*/comments
// @exclude       http://*.douban.com/subject/*/reviews
// @exclude       http://*.douban.com/subject/*/new_review
// @exclude       http://*.douban.com/subject/*/group_collectors
// @exclude       http://*.douban.com/subject/*/discussion/
// @exclude       http://*.douban.com/subject/*/wishes
// @exclude       http://*.douban.com/subject/*/doings
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

var libhelperFunction = function(){
	var title = $("div#wrapper h1:first span")[0].textContent.trim();
	try{
		var isbn = $("div[id='info']:first span:contains('ISBN')")[0].nextSibling.textContent.trim();
	}catch(e){
		if(e.name == "TypeError") isbn="0";
	}
	title = encodeURIComponent(title);
	isbn = encodeURIComponent(isbn);

	var url = "http://pc.shu.edu.cn/libhelper/search/"
	var html_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><h2>在上海大学借这本书?  · · · · · · </h2>'
	var html_body_end = '</ul>';
	var html_body_endmore = '<a href="http://pc.shu.edu.cn/libhelper/help/#usage" target="_blank">&gt; 使用帮助</a>&nbsp;&nbsp;<a href="http://pc.shu.edu.cn/libhelper/showlist/" target="_blank">&gt; 显示书单</a>&nbsp;&nbsp;<a href="http://pc.shu.edu.cn/libhelper/" target="_blank">&gt; 脚本主页</a> ';
	var html_body_endend = '</div><span style="visibility:hidden"><a href="http://www.51.la/?14908173" target="_blank"><img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="http://img.users.51.la/14908173.asp" style="border:none" /></a></span>';
	var qurl = url + isbn + '/' + title + '/';

	$.getScript(qurl,function(){
		if(ShuLibData.count > 5){
			html_body_endmore += '<span style="text-align:right; padding:0px 10px 5px 0px;" class="rr"><a href="' + ShuLibData.url + '" target="_blank">更多馆藏&hellip;</a></span>';
		}
		$( '.aside' ).prepend( html_title + '<ul class="bs">' +  ShuLibData.data + html_body_end + html_body_endmore + html_body_endend );
	});
}
function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval( libhelperFunction );

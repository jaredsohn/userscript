// ==UserScript==
// @name			Reform
// @namespace		http://weibo.com/put2
// @license			MIT Licens
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @description		更改时间戳显示方式，方便 Evernote 等工具摘录微薄
// @features		
// @version			0.1
// @revision		1
// @author			@糯米fan儿(/put2)
// @include			http://weibo.com/*
// @include			http://www.weibo.com/*
// ==/UserScript==
//

$('dd.content').each(function() {
	var content = $(this).children('em');
	var stamp = $(this).children('a.date');
	content.before(stamp.html());
});

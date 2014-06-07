// ==UserScript==
// @name           Mydouban link
// @namespace      http://newbdez33.blogspot.com
// @include        http://*.douban.com/*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
} 
try{
	var l = $('.top-nav-items > ul > :first-child');
	l.html(l.html()+'(<a href="http://www.douban.com/mine/">我的豆瓣</a></li>)');
}catch(e){}
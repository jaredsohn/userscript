// ==UserScript==
// @name			校内日志分享页面标题调整
// @author			xieranmaya@gmail.com
// @description		把校内日分享志页面的标题添加到浏览器标题栏里
// @include			http://blog.renren.com/share/*/*
// ==/UserScript==

(function(){
	var t = document.querySelector('title').innerHTML;
	document.querySelector('title').innerHTML = t.substr(0,3)+" "+t.substr(3)+" - "+document.querySelector('.title-article>strong').innerHTML;
})();
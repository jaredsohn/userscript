// ==UserScript==
// @name           twitter_more
// @author         Garphy
// @version        1.0
// @description    load more tweets automaticly for twitter & 163wb
// @website        http://blog.garphy.com/?p=48
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://twitter.com/*
// @include        http://t.163.com/*
// @scriptsource   http://userscripts.org/scripts/show/9310
// ==/UserScript==
function more(){
	var o = document.getElementById('more') ||  document.getElementById('btn_more').getElementsByTagName('a')[0];
	var b = document.getElementById('pagination') || document.getElementById('btn_more');
	if( o.className!='round more loading' && document.documentElement.scrollTop + document.documentElement.clientHeight >= b.offsetTop ){
		var ev = document.createEvent('MouseEvents');
		ev.initEvent('click', true, true);
		o.dispatchEvent(ev);
	}
	window.setTimeout( more , 2000);
}
window.setTimeout( more , 2000);

/* 
Accept Helper(tm)自動載入小工具  v0.1 by czh

Changelog:
==
2011-08-09 v0.1, 試做版
	
*/
// ==UserScript==
// @author         Accept Helper Load
// @version        0.1
// @name          Accept Helper Auto-loader 
// @namespace     http://nerv.appspot.com/
// @description   在Facebook邀請頁面自動載入Accept Helper
// @scriptsource  http://nerv.appspot.com/
// @include       http://www.facebook.com/reqs.php
// @include       http://www.facebook.com/games
// ==/UserScript==

(function(){
	var body = document.getElementsByTagName('body')[0] || document.documentElement,
		script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = "javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://nerv.appspot.com/fbp/djs/reqs.js';})();";
	body.insertBefore(script, body.firstChild);
})();
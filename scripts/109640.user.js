/* 
AppClear(tm)自動載入小工具  v0.1 by czh

Changelog:
==
2011-08-09 v0.1, 試做版
	
*/
// ==UserScript==
// @author         AppClear Load
// @version        0.1
// @name          AppClear Auto-loader 
// @namespace     http://nerv.appspot.com/
// @description   Auto load AppClear
// @scriptsource  http://nerv.appspot.com/
// @include       http://apps.facebook.com/*
// ==/UserScript==

(function(){
	var body = document.getElementsByTagName('body')[0] || document.documentElement,
		script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = "(function(){document.body.appendChild(document.createElement('script')).src='http://nerv.appspot.com/fbp/djs/appclear.js';})();";
	body.insertBefore(script, body.firstChild);
})();
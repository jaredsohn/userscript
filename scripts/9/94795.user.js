/* 
撲通(tm)自動載入小工具  v0.2 by foxzgerald

Description
==
噗通(tm) 是一套 Plurk噗浪表情符號的小工具，由 Babymaple 與 Tureki 所開發。
而這個 userscript 則是自動載入撲通的小工具。

Changelog:
==
2011-01-17 v0.2, 改用 innerHTML 的方式載入，支援 Chrome 8+, Opera 11+, Firefox 3.6+(with Greasemonkey)
2011-01-16 v0.1, 試做版
	
*/
// ==UserScript==
// @author         foxzgerald
// @version        0.2
// @name          撲通 Auto-loader 
// @namespace     http://citytalk.tw/
// @description   Auto load 撲通
// @scriptsource  http://userscripts.org/scripts/show/94795
// @include       http://www.plurk.com/*
// ==/UserScript==

(function(){
	var body = document.getElementsByTagName('body')[0] || document.documentElement,
		script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = "var timestamp = new Date().getTime(); var main = document.createElement('script');main.type = 'text/javascript';main.src= 'http://citytalk.tw/plugin_plurk_index.js?'+timestamp;document.body.appendChild(main);";
	body.insertBefore(script, body.firstChild);
})();
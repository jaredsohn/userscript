// ==UserScript==
// @name           Neopets Burger King Canada Code Redeemer
// @description    Redeems all Canadian BK codes
// @author         Dilly Bar
// @include        *www.neopets.com/bk/
// @require        http://userscripts.org/scripts/source/138039.user.js
// @namespace      http://userscripts.org/scripts/show/138032
// @version        1.5
// ==/UserScript==
window.onload = function(){
	var	randmdiv =  document.getElementsByTagName("body")[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'http://userscripts.org/scripts/source/138039.user.js';
	randmdiv.appendChild(newScript);	
};
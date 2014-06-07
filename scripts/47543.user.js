// ==UserScript==
// @name			Remove Kampyle
// @author			Erik Vold
// @namespace		removeKampyle
// @match			http://*
// @match			https://*
// @include			http*://*
// @exclude			http*://*.google.c*
// @exclude			http*://*.yahoo.c*
// @exclude			http*://*.google.c*
// @exclude			http*://*.bing.c*
// @exclude			http*://*.twitter.com*
// @exclude			http*://*.facebook.c*
// @exclude			http*://*.userscripts.org*
// @exclude			http://*.erikvold.com*
// @exclude			http*://*.digg.com*
// @exclude			http*://*.mixx.com*
// @exclude			http*://*.reddit.com*
// @version			1.1.2
// @datecreated		2009-04-24
// @lastupdated		2009-12-18
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This will remove the kampyle link that is at the bottom right corner of so many websites.
// ==/UserScript==

(function(){
	var k=document.getElementById('kampylink');
	if(k) return k.parentNode.removeChild(k);
})();
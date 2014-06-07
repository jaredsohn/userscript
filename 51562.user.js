// ==UserScript==
// @name           No Experts Exchange
// @namespace      userscripts.org
// @description    Hide Expets-Exchange.com Results From Google
// @version        0.1
// @include        http://google.com/search?*
// @include        http://www.google.com/search?*
// @include        http://*.google.com/search?*
// ==/UserScript==

var url = document.URL;
if(!url.match('-site%3Aexperts-exchange.com')){
	var urlArray   = document.location.toString().split("q=");
	var queryArray = urlArray[1].split('&',1);
	var newQuery   = queryArray[0] + '+-site%3Aexperts-exchange.com&';
	window.location.replace(url.replace('q=' + queryArray[0],'q=' + newQuery));
}
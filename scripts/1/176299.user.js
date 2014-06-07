// ==UserScript==
// @name        Clean URL from GET Parameters
// @namespace   cleanurl
// @description This script removes the GET parameters from URL's (i.e. the "?xyz=123&abc=def" part) from sites like Gizmodo and Kotaku where they get added when clicking on links from Facebook etc.
// @include     http://kotaku.com*
// @include     http://gizmodo.com
// @version     1.0
// @grant 		none
// ==/UserScript==

var get = document.location.href.indexOf('?');
if (get > 0)
	document.location.replace(document.location.href.substr(0,get));
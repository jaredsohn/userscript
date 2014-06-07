// ==UserScript==
// @name           Enable Cross Domain XML HTTP Request
// @namespace      http://userscripts.org/users/186417
// @include        http://pyloth.com/ttycity.html
// @include        http://www.pyloth.com/ttycity.html
// ==/UserScript==
// credit: http://userscripts.org/topics/42827#row-205205
unsafeWindow.GM_xmlhttpRequest = function(obj) {
	window.setTimeout(GM_xmlhttpRequest, 0, obj);
};
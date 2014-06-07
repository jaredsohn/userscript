// ==UserScript==
// @name           Hide Twitter Trends & Follow Recommends
// @namespace      http://codeoptimism.net
// @author         Christopher Galpin
// @include        http://*twitter.com*
// @include        https://*twitter.com*
// @version        1.2
// @require        http://code.jquery.com/jquery.min.js
// ==/UserScript==

$('div.trends-inner, div.user-rec-inner').live('DOMNodeInserted', removeOffending);

function removeOffending() {
	//$(this).parent().css('display','none');
	$(this).parent().remove();
}
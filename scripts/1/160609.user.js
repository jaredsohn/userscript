// ==UserScript==
// @name           tvtv.de (rtv) title link imdb
// @namespace      tvtv.de
// @include        http://www.tvtv.de/detailansicht.php*
// @grant          none
// ==/UserScript==

var titleNode = document.getElementById('DetailTitelinfos');
if (titleNode) {
	var originalTitle = titleNode.firstChild.innerHTML.replace(/&amp;/g,"&");
	titleNode.innerHTML = "<a href=\"http://www.imdb.com/find?s=all&q="+encodeURIComponent(originalTitle) 
		+ "\" target=\"_new\">" + titleNode.innerHTML + "</a>";
}

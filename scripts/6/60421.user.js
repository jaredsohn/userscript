// ==UserScript==
// @name           Hide link numbers on Hacker News frontpage and new page
// @namespace      http://userscript.org/
// @description    Hide link numbers on Hacker News frontpage and new page.
// @include        http://news.ycombinator.com/
// @include        http://news.ycombinator.com/news
// @include        http://news.ycombinator.com/newest
// @include        http://news.ycombinator.com/x?*

// ==/UserScript==

(function () {
	var tds = document.getElementsByTagName("td");
	for(i=0;i<tds.length;i++){
		if(tds[i].getAttribute("align") == "right"){
			tds[i].innerHTML = "";
		}
	}
})();

// ==UserScript==
// @name          Hide Hacker News downvote links
// @namespace     http://userscript.org/
// @description   Hides the downvote links on comments on Hacker News.
// @include       http://news.ycombinator.com/item?id=*
// @include       http://news.ycombinator.com/threads*
// @include       http://news.ycombinator.com/newcomments*
// ==/UserScript==

(function () {
	dl=document.links;
	for(i=0;i<dl.length;++i){
		if(dl[i].href.indexOf("dir=down") != -1){
			dl[i].href="";
			dl[i].innerHTML="";
		}
	}
})();

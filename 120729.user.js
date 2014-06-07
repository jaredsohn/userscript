// ==UserScript==
// @name           imdbde2com
// @namespace      http://iload.to/
// @include        http://iload.to/*
// @version        1.0
// @require http://sizzlemctwizzle.com/updater.php?id=120729
// ==/UserScript==

var a = document.getElementsByTagName("a");

for(var i=0; i<a.length; i++)
{
	var href = a[i].href;
	if(href.match(/imdb.de/)){
		href = href.replace(/imdb.de/g, "imdb.com");
		a[i].href = href.slice(18, href.length);
	}
}
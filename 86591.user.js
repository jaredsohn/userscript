// ==UserScript==
// @name           FullAnimes Cleaner && Renamer
// @author         Aversiste
// @namespace      FullAnimes
// @date           12/09/2010
// @version        0.2
// @description	   Remove useless stuff that can't be handle by css and rename the page.
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://fullanimes.free.fr/animes-episodes-ddl*
// ==/UserScript==

// Use it with stylish extention 

(function () {
	var nodes = document.getElementsByTagName('div');
	if (navigator.appName == "Opera")
		document.title =(nodes[22].innerHTML.substring(10));
	else	{
		var title = nodes[22].innerHTML.substring(115);
		title = title.substring(0, title.indexOf('<', 0));
		document.title =(title);
	}
	nodes = nodes[24].getElementsByTagName('a');
	nodes[0].style.display = "none";
})();
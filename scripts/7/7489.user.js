// ==UserScript==
// @name           Wikipedia Google Search
// @namespace      http://Xenolith0.net/
// @description    Search Wikipedia with Google by default
// @include        http://*.wikipedia.org/*
// @include        http://wikipedia.org/*
// ==/UserScript==

(function ()
{
	document.getElementById('searchform').setAttribute("action", "http://www.google.com/custom");
	document.getElementById('searchInput').setAttribute("name", "q");
	var sp1 = document.createElement('input');
	sp1.setAttribute('id', 'wikiepedia_google_search');
	sp1.setAttribute('type', 'hidden');
	sp1.setAttribute('name', 'sitesearch');
	sp1.setAttribute('value', 'wikipedia.org');
	before_go = document.getElementById('searchGoButton');
	before_go.parentNode.insertBefore(sp1, before_go.searchGoButton);
})();
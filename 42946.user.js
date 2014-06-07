// ==UserScript==
// @name           Twitter Search in navigation
// @namespace      com.twitter.search-in-navi
// @include        http*://twitter.com/*
// @include        http*://www.twitter.com/*
// ==/UserScript==

(function() {
	document.getElementById('navigation').getElementsByTagName('ul')[0].innerHTML += '<li><form style="display:inline" action="http://search.twitter.com/search" method="get"><input type="text" name="q" /> <button type="submit" style="padding: 2px 4px">Search</button></form></li>';
})();

// ==UserScript==
// @name        RPS Pullquote
// @namespace   rpspullquote
// @include     http://www.rockpapershotgun.com/*
// @version     1
// ==/UserScript==

var elements = document.getElementsByClassName("simplePullQuote");
for(var a = 0; a < elements.length; a++)
	elements[a].style.display = 'none';
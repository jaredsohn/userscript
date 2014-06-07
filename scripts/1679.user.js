// ==UserScript==
// @name           Pirate Bay title fixer
// @namespace      http://henrik.nyh.se
// @description    Sets better titles i.e. tab names for The Pirate Bay. On torrent pages, the title is set to the torrent name. On most other pages, the title is set to the value of the header, e.g. "Search results: Dwarves".
// @include        http://*thepiratebay.org/*
// ==/UserScript==

// Set title to torrent name, when applicable
if (document.getElementById('title'))
	document.title = document.getElementById('title').innerHTML;

// Otherwise set title to header, when applicable
else if (document.getElementsByTagName('h2')[0])
	document.title = document.getElementsByTagName('h2')[0].childNodes[0].innerHTML;
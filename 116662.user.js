// ==UserScript==
// @name           Hide freeleech tokens
// @namespace      http://userscripts.org
// @description    Hide freeleech tokens
// @include        http://what.cd/torrents.php?id=*
// @include        http://what.cd/artist.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/artist.php?id=*

// ==/UserScript==

var links = document.querySelectorAll('a[title][href]');
for (var i = 0; i < links.length; i++) {
	if (links[i].title.match(/Use\ a\ FL\ Token/)) {
		links[i].style.display = 'none';
	}
}
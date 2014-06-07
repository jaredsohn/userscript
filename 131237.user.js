// ==UserScript==
// @name           Ryan Durling
// @include        http://*
// ==/UserScript==

var images = document.getElementsByTagName('img');
for(i=0; i<images.length; i++) {
	images[i].src = 'http://www.jemsweb.com/wp-content/uploads/2011/01/burt_reynolds.jpg';
}
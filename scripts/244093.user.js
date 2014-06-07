// ==UserScript==
// @name        cameron -> iggle piggle
// @namespace   cameron
// @include     http*://*
// @version     0.2
// @grant       none
// ==/UserScript==

var imgs = document.getElementsByTagName('img');

if (document.body.textContent.toLowerCase().indexOf("david cameron") === -1) {
	return;
}

for (i=0; elm = imgs[i]; i++) {
	if ((elm.alt.toLowerCase().indexOf("cameron") != -1 && elm.alt.toLowerCase().indexOf("cameron diaz") === -1) 
		|| elm.src.toLowerCase().indexOf("cameron") != -1 ) {
		elm.src = "http://ecx.images-amazon.com/images/I/416qLWbhV8L._SS400_.jpg";
	}
}
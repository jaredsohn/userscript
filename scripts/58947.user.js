// ==UserScript==
// @name           ingame.de in-post adbox remover
// @namespace      http://userscripts.org/users/26744
// @include        http://*.ingame.de/forum/showthread.php*
// ==/UserScript==

// part 1: list all img elements - check if they're using
// the "clear.gif" spacer element, remove 'em

var imgs = document.body.getElementsByTagName('img');

for(var i=0; i<imgs.length; i++) {
	if( imgs[i].getAttribute('src') == "clear.gif" ) {
		imgs[i].parentNode.removeChild(imgs[i]);
	}
}

// part 2: list all the div elements - compare them to
// previously determined attribute values and then destroy 
// the first one that we find.

var divs = document.body.getElementsByTagName('div');
for(var i=0; i<divs.length; i++) {
	// this abuses the fact that currently (2009-10-01), the
	// adbox is the only div element with the "alt2" class.
	if( divs[i].getAttribute('class') == "alt2" ) {
		divs[i].parentNode.removeChild(divs[i]);
		break;
	}
}

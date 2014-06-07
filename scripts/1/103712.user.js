// ==UserScript==
// @name           forum.EVE-ru.com remove thickbox
// @namespace      http://forum.eve-ru.com
// @description    Removes thickbox from forum.eve-ru.com (may also work on any other IPB, just add url to includes)
// @include        http://forum.eve-ru.com/*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for(i=0;i<links.length;i++) {
	if(links[i].getAttribute('class') == 'resized_img') {
		links[i].setAttribute('rel', '');
		links[i].setAttribute('id', '');
	}
}
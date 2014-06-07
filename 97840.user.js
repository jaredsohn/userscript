// ==UserScript==
// @name           torcache fix
// @namespace      http://www.userscripts.org
// @description    convert links with torcache to torrage
// @include        http://www.kickasstorrents.com/*
// ==/UserScript==


var links = document.querySelectorAll('a[href*="torcache"]');
var i, newhref;
for (i = 0; i < links.length; i++) {
	newhref = links[i].getAttribute('href').replace('torcache', 'torrage');
	links[i].setAttribute('href', newhref);
}

// ==UserScript==
// @name           Removing redirect links in google search
// @namespace      http://yperevoznikov.com
// @include        http://www.google.*/*q=*
// ==/UserScript==

setInterval(function(){
	links = document.getElementsByTagName('a');
	for (var i in links) {
		var href = links[i].getAttribute('href');
		if (/(.*)&adurl=/gi.test(href)) {
			links[i].setAttribute('href', href.replace(/(.*)&adurl=/gi, ""));
		}		
	}
}, 1500);
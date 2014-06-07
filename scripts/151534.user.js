// ==UserScript==
// @name           LADADA
// @namespace      maeki.org
// @description    Test
// @include        tribalwars.net
// ==/UserScript==

var websites = [    // Here you can fill up the wanted sites and jump times in seconds.
	["http://www.wikipedia.org", 3],
	["http://www.google.com.sa", 5],
	["http://www.website3.com", 8]
];

for (var i = 0; i < websites.length; i++) {
	if (document.location.href.indexOf(websites[i][0]) != -1) {
		setTimeout(function() {
			document.location.href = websites[(i+1)%websites.length][0];
		}, websites[i][1]*1000);
		break;
	}
}
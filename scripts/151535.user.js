// ==UserScript==
// @name           tribalwarsdir
// @namespace      maeki.org
// @description    Test
// @include        tribalwars.net
// ==/UserScript==

var websites = [    // Here you can fill up the wanted sites and jump times in seconds.
	["http://www.wikipedia.org", 5],
	["http://www.google.com", 5],
	["http://www.youtube.com", 5]
        ["http://speedtest.net", 5]
];

for (var i = 0; i < websites.length; i++) {
	if (document.location.href == websites[i][0]) {
		setTimeout(function() {
			document.location.href = websites[(i+1)%websites.length][0];
		}, websites[i][1]*1000);
		break;
	}
}
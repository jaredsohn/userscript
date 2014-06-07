// ==UserScript==
// @name           Tr-Re
// @namespace      tribalwars.net
// @description    Test
// @include        http://www.google*
// ==/UserScript==

var websites = [    // Here you can fill up the wanted sites and jump times in seconds.
	["http://www.wikipedia.org", 2],
	["http://www.google.com", 2],
	["http://www.youtube.com", 2]
        ["http://speedtest.net", 2]
];

for (var i = 0; i < websites.length; i++) {
	if (document.location.href == websites[i][0]) {
		setTimeout(function() {
			document.location.href = websites[(i+1)%websites.length][0];
		}, websites[i][1]*1000);
		break;
	}
}
// ==UserScript==
// @name           Redirect
// @namespace      maeki.org
// @description    Test
// @include        *
// ==/UserScript==

var websites = [    // Here you can fill up the wanted sites and jump times in seconds.
	["http://www.google.com", 3],
	["http://www.yahoo.com", 5],
	["http://www.hotmail.com", 8]
];

for (var i = 0; i < websites.length; i++) {
	if (document.location.href.indexOf(websites[i][0]) != -1) {
		setTimeout(function() {
			document.location.href = websites[(i+1)%websites.length][0];
		}, websites[i][1]*1000);
		break;
	}
}
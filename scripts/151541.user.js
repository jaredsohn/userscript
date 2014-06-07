// ==UserScript==
// @id             Timed Redirect
// @name           Timed Redirect
// @version        1.0
// @include        http://www.youtube.com/*
// ==/UserScript==

var websites = [    // Here you can fill up the wanted sites and jump times in seconds.
	["http://www.youtube.com/watch?v=TxMD02zU9SE&feature=g-all-xit", 3],
	["http://www.youtube.com/watch?v=f8U_JveHS8E&feature=related", 3],
	["http://www.youtube.com/watch?v=KdHVf2jUcko", 3],
	["http://www.youtube.com/watch?v=QvsBLnsyOSc", 3]
];

for (var i = 0; i < websites.length; i++) {
	if (document.location.href.indexOf(websites[i][0]) == 0) {
		setTimeout(function() {
			document.location.href = websites[(i+1)%websites.length][0];
		}, websites[i][1]*1000);
		break;
	}
}
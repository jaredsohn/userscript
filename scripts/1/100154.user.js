// ==UserScript==
// @name            Motherless Video Downloader
// @namespace       MoViDo
// @include         http://motherless.com/*
// @homepage        http://userscripts.org/scripts/show/100154
// @updateurl       http://userscripts.org/scripts/source/100154.user.js
// @version         1.2
// ==/UserScript==

var I_Have_A_Realy_Old_Browser = false; // Set this to true if you use IE7, FF3.5 or CHROME10 ( or older )

var re = /http:\/\/.+\d\.flv\/.+\.flv/;
var str = document.getElementById('media-media').innerHTML;
var link = str.match(re, "$1");

if (I_Have_A_Realy_Old_Browser) {
	if (link !== null) {
		document.getElementById('media-media').innerHTML += '<h2><br><a href="' + link + '?start=0">Direct Download</a></h2>';
	}
} else {
	GM_xmlhttpRequest({
		url: link + '?start=0',
		method: "HEAD",
		onload: function(response) {

			var re = /\d+/g;
			var str = response.responseHeaders.match(/Content-Length: \d+/);
			var str = str.toString();
			var size = str.match(re, "$1");
			size = (size / 1024) / 1024;
			size = size.toFixed(2);

			if (link !== null) {
				document.getElementById('media-media').innerHTML += '<h2><br><a href="' + link + '?start=0">Direct Download (' + size + ' MB)</a></h2>';
			}
		}
	});
}
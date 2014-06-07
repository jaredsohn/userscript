// ==UserScript==
// @name            VidEarn Video Downloader
// @namespace       ViVidDo
// @include         http://videarn.com/*
// @updateurl       http://userscripts.org/scripts/show/149078
// ==/UserScript==

// Much owed to MoViDo: http://userscripts.org/scripts/show/100154

var re = /http:\/\/.+\.mp4/;

var str = document.getElementById('container').innerHTML;
var link = str.match(re, "$1");

document.getElementById('download').innerHTML += '<br/><br/><a style="font-size: 15px; color: red;" href="' + link + '">Leech It</a>';

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (is_chrome) {
	if (link != null) {
		document.getElementById('download').innerHTML += '<span style="font-size: 15px; color: red;"> (?Mb)</span>';
	}
} else {
	GM_xmlhttpRequest({
		url: link,
		method: "HEAD",
		onload: function(response) {

			var re = /\d+/g;
			var str = response.responseHeaders.match(/Content-Length: \d+/);
			var str = str.toString();
			var size = str.match(re, "$1");
			size = (size / 1024) / 1024;
			size = size.toFixed(2);

			if (link != null) {
				document.getElementById('download').innerHTML += '<span style="font-size: 15px; color: red;"> (' + size + 'Mb)</span>';
			}
		}
	});
}

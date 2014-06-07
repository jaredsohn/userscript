// ==UserScript==
// @name            GasXXX Video Downloader
// @namespace       GasViDo
// @include         http://www.gasxxx.com/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

var re = /http:\/\/www\.gasxxx\.com\/media\/player\/config\.php\?vkey=\d+/;

var str = document.getElementById('player').innerHTML;
var link = str.match(re, "$1");

GM_xmlhttpRequest({
	url: link,
	method: "GET",
	onload: function(response) {
		var re = /http:\/\/www\.gasxxx\.com:81\/flv\/.+\/\d+\.flv/;
		var flv = response.responseText.match(re, "$1");
		var link = document.getElementById('embed_video');
		link.innerHTML = '<a href="' + flv + '">Download</a>';
	}
});

// ==UserScript==
// @name        buzz4u.fr 123jeris.fr 123ilol.fr
// @namespace   f4rf3lu
// @description Redirect to original video
// @include	http*://*123jeris.fr/*
// @include	http*://*buzz4u.fr/*
// @include	http*://*123ilol.fr/*
// @version     1
// ==/UserScript==

(function() {
var url = null, s1 = document.getElementsByTagName('iframe')[0].src;
if (s1.indexOf('://www.youtube.com/embed/') !== -1) {
	url = s1;
} else {
	var s2 = document.getElementsByTagName('param'), i;
	for (i in s2) {
		if (s2[i].name === 'movie') {
			url = s2[i].value;
		}
	}
}
if (url === null) {
	var s3 = document.getElementsByTagName('embed')[0].getAttribute('flashvars').match(/file=([^&]+)/)[1];
	if (s3 != '') {
		url = s3;
	}
}
if (url !== null) {
	window.location = url;
}
})();

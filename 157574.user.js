// ==UserScript==
// @name			Fur-affinity auto-open direct image
// @version			0.0000001
// @namespace		http://www.furaffinity.net/*
// @author			Joseph
// @description		Gets the full image version when you click the tumbnails or whatever.
// @icon	http://www.furaffinity.net/favicon.ico
// @run-at    		document-body
// @include			*furaffinity.net/*
// ==/UserScript==

swf_file = document.getElementsByTagName('object')[0];

if (window.location.href.search('/view/') !== -1) {
	if (unsafeWindow.full_url) {
		window.location.href = unsafeWindow.full_url;
	}
	else if (swf_file) {
		window.location.href = swf_file.childNodes[1].value;
	}
}
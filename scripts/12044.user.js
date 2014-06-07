// ==UserScript==
// @name           Scientific article PDF full-screener
// @namespace      geoscienceworld.org
// @description    Removes the frame by PDF articles on Wiley Online Library and GeoScienceWorld-style sites 
// @include        http://*
// @version      1.1.4 Fix Wiley to avoid getting in a loop
// @version      1.1.3 Restore support for /reprint/ URLs
// @version 	1.1.2 Support myaccess syntax & /content/ URLs
// ==/UserScript==

var h = window.location.href;
if (h.match(/\/cgi\/reprint\/\d+\//) && h.substr(-4) != ".pdf") {
	window.location.href = h + ".pdf"; // Only for reprints
} else if (h.match(/pdf\+html/)) {
	window.location.href = h.replace(".pdf+html", ".pdf");
} else if (h.match(/onlinelibrary\.wiley\.com.*\/pdf$/)) {
	var iframes = document.getElementsByTagName("iframe");
	if (iframes && iframes[1].src) {
		window.location.href = iframes[1].src;
	} 
}
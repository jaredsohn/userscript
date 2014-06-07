// ==UserScript==
// @name           Google Reader Large Dilbert Daily Strip
// @description    Replace smaller (print) version Dilbert Daily Strip available through official RSS feed with the larger (screen) version available only through the official website Flash viewer. As the title suggests, this is designed to work in Google Reader.
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

document.addEventListener("DOMNodeInserted",
	function(evt) {
		var dilbertStrip = document.evaluate(".//img[starts-with(@src, 'http://dilbert.com/') and contains(@src, '.print.gif')]", evt.target, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if (dilbertStrip) {
			dilbertStrip.src = dilbertStrip.src.replace(/\.print\./, ".");
		}
	}, false);

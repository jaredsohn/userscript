// ==UserScript==
// @name Google Web History Updater
// @author Amemiya
// @namespace http://sukima.me
// @version 0.0.2
// @license public domain
// @description : Update web history to Google
// @published 2012-03-20
// @include *
// @exclude http://www.google.tld/search?*
// @exclude http://images.google.tld/images?*
// @exclude http://maps.google.tld/maps?*
// @exclude http://news.google.tld/news?*
// @exclude http://www.google.tld/products?*
// @exclude http://video.google.tld/*
// @exclude http://books.google.tld/books?*
// @exclude http://blogsearch.google.tld/blogsearch?*
// @exclude http://www.google.tld/history/*
// @exclude https://*
// ==/UserScript==

(function(){
	if (window.self != window.parent) return;
	
	function awesomeHash(b) {
		for (var c = 16909125, d = 0; d < b.length; d++) {
			var HASH_SEED_ = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
			c ^= HASH_SEED_.charCodeAt(d % HASH_SEED_.length) ^ b.charCodeAt(d);
			c = c >>> 23 | c << 9
		}
		return hexEncodeU32(c)
	}

	function hexEncodeU32(b) {
		var c = toHex8(b >>> 24);
		c += toHex8(b >>> 16 & 255);
		c += toHex8(b >>> 8 & 255);
		return c + toHex8(b & 255)
	}
	
	function toHex8(b) {
		return (b < 16 ? "0": "") + b.toString(16)
	}
	
	var url = document.location.toString().split("#")[0];
	var hash = awesomeHash(url);
	var query = "http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=8" + hash + "&features=Rank&q=info:" + url;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", query, false);
	xhr.send();
})();
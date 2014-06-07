// ==UserScript==
// @name           Hide the pretty right column
// @include        http://www.facebook.com/*
// @version        1.0
// @author         nori (http://5509.me/)
// @modified       2011-09-22 11:53
// ==/UserScript==

(function(document) {
	document.getElementById("rightCol").style.display = "none";
}(this.document));
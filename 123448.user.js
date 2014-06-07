// ==UserScript==
// @name           WikiSOPA
// @namespace      http://en.wikipedia.org/*
// @description    Remove SOPA blackout overlay from wikipedia.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function() {
	function showWiki() {
		$("div#mw-sopaOverlay").remove();
		$("div#content").show();
		$("div#mw-page-base").show();
		$("div#mw-head-base").show();
		$("div#mw-head").show()
		$("div#mw-panel").show()
		$("div#footer").show();
	}
	setTimeout(showWiki, 1000);
});

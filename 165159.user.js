// ==UserScript==
// @name        Show iTunes Podcast Feed
// @namespace   http://userscripts.org/users/djpohly
// @description Retrieves the URL of the original feed for an iTunes podcast and places a link to it in the Links sidebar on the podcast preview page.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match       *://itunes.apple.com/podcast/*
// @match       *://itunes.apple.com/*/podcast/*
// @grant       GM_xmlhttpRequest
// @version     1.0
// ==/UserScript==

// Adapted from the handy tool by lasavior at http://itunes.so-nik.com/.

// No support for iTunes-U
if (/\/itunes-u\//.test(location.href))
	return;

// Get ID from URL
var id = location.href.match(/[?&]id=(\d+)/) || location.href.match(/\/id(\d+)/);
if (!id)
	return;

// Set up the new link
var newitem = document.createElement("li");

// Loading text displayed first
var loadtext = document.createTextNode("Original Feed (loading)");
newitem.appendChild(loadtext);

// Link to the feed, displayed on success (href is set later)
var newlink = document.createElement("a");
var donetext = document.createTextNode("Original Feed");
newlink.appendChild(donetext);

// Error text, displayed on failure
var errortext = document.createTextNode("Original Feed (couldn't load)");

// Insert into the DOM
$("div[metrics-loc=Titledbox_Links] > ul.list").prepend(newitem);


// Build URL for request.  Caching caused problems, so we add a query string.
var itunesurl = "https://itunes.apple.com/podcast/id" + id[1] + "?" + new Date();

GM_xmlhttpRequest({
	method: "GET",
	url: itunesurl,
	headers: { "User-Agent": "iTunes/9.1.1" },
	onload: function(response) {
		// Pick the feed URL out of the response
		var m = response.responseText.match(/feed-url="([^"]*)"/);
		if (!m) {
			newitem.replaceChild(errortext, loadtext);
			return;
		}

		// Wire up the link
		newlink.setAttribute("href", m[1]);
		newitem.replaceChild(newlink, loadtext);
	},
});

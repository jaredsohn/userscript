// ==UserScript==
// @name           Logout from Google Search
// @namespace	   logout_google_search
// @description	   Automatically logs you out of your Google account when using Google Search.
// @include        http://www.google.tld/*
// @include        https://www.google.tld/*
// @exclude        http://www.google.tld/reader/*
// @exclude        https://www.google.tld/reader/*
// @version        1.3.0
// @run-at document-end
// ==/UserScript==

var loggedIn = document.getElementById('gb_71');
var url = String(window.location);

query = url.split("q=");
query = query[1].split("&");
query = query[0];
query = query.replace( /\+/g, '-' );

if (loggedIn != null) {
	window.location.replace("https://www.google.com/accounts/Logout?continue="+location.protocol+"//"+location.host+"/search?q="+query)
}
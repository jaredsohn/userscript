// ==UserScript==
// @name           Permanently Enable HTML5 on YouTube
// @namespace      katmagic
// @description    Permanently enable HTML5 on YouTube.
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

/* This is free and unencumbered software released into the public domain. */

var cookies = document.cookie.split("; ");
var subbed = false;

for (var i in cookies) {
	if (cookies[i].search("PREF=") == 0) {
		subbed = true;

		if (cookies[i] == "PREF=") {
			// PREF is blank. Set f2.
			var c = "PREF=f2=40000000";
		} else if (cookies[i].search(/[&=]f2=/) == -1) {
			// f2 isn't specified. Set it.
			var c = cookies[i] + "&f2=40000000";
		} else if (cookies[i].search(/[&=]f2=40000000(&|$)/) == -1) {
			// f2 has a value other than 40000000. Set it properly.
			var c = cookies[i].replace(/([&=])f2=[^&]*(&|$)/, "$1f2=40000000$2");
		} else {
			// f2 is already properly set. We needn't do anything.
			return;
		}

		// Log what we did, if we did anything.
		console.log( "Changing PREF from '" + cookies[i].substr(5) + "' to '" +
		             c.substr(5) + "'." );
		document.cookie = c + ";domain=.youtube.com";
	}
}

if (!subbed) {
	// PREF doesn't exist. Create PREF and log about it.
	console.log("Creating cookie PREF with value 'f2=40000000'.")
	document.cookie = "PREF=f2=40000000;domain=.youtube.com";
}

// Request /html5. For god-knows-what reason, YouTube sometimes (but not always)
// requires a page other than / to have been requested.
var req = new XMLHttpRequest();
req.open("GET", "/html5", false);
req.send();

location.reload(true);

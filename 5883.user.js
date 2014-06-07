// ==UserScript==
// @name           Google Safe Search Auto-Off
// @namespace      http://www.digivill.net/~joykillr
// @description    Auto-disable the google safe search (so as to display all results unfiltered)
// @include        http://*.google.com/*
// @include        http://google.com/*
// ==/UserScript==

// v2.0.2
// Back button will work now.
var slshchk = window.content.location.href.toString();
var hchk = window.content.location.host.toString();
var urlexp = new RegExp(/\/$/);

if ((!hchk.match(/^trends/i)) && (!hchk.match(/^mail/i))) {
	if ((slshchk.indexOf("\?") != -1) && (slshchk.search("safe=") == -1) && (!slshchk.match(urlexp))) {
		window.content.location.replace(slshchk+"&safe=off");
	}
	else if ((slshchk.search("safe=") != -1) && (slshchk.search("safe=off") == -1)) {
		var isolurl = slshchk.split("safe=")[1].split("&")[0];
		slshchk = slshchk.replace("safe=" + isolurl, "safe=off");
		window.content.location.replace(slshchk);
	}
}

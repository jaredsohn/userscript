// ==UserScript==
// @name          Reddit hide douchebag comments
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Self-explanatory
// @author        poopstain
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==
(function(u) {
	var a = document.querySelectorAll('div.commentarea a.author'), i;

	for (i in a) {
		if (u.indexOf(a[i].text) >= 0) {
			a[i].parentElement.parentElement.parentElement.style.display = 'none';
		}
	}
})(['AnnArchist', 'nixonrichard', 'NoMoreNicksLeft']);
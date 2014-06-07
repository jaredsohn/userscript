// ==UserScript==
// @name           DeviantArt title fixer
// @namespace      http://henrik.nyh.se
// @description    Sets better titles i.e. tab names for DeviantArt. Basically removes the initial "deviantART: " bit. Optionally, your own (probably shorter) prefix can be added.
// @include        http://deviantart.com/*
// @include        http://*.deviantart.com/*
// ==/UserScript==

var prefix = '';
//prefix = "dA: ";  // NOTE: Uncomment this line for a shorter "dA: " prefix, or change it to something else.

// Extract current title

t = document.title;

// Index page gets a specific title

if (window.location.href.match(/:\/\/(www.)?deviantart.com\/?$/))
	document.title = 'deviantART';

// For any other page, strip the prefix bit
// Optionally, set another prefix

else if (t.indexOf('deviantART: ') == 0)
	document.title = prefix + t.substring(12);


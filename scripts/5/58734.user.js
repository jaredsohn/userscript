// ==UserScript==
// @name           Reddit Comment Bomb Fix
// @namespace      redditcommentbomb
// @description    Fixes the comment bombs on Reddit
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

(function () {// <-- Opera wrapper

var virii = document.evaluate("//a[@href=\"/<a href=\"]", document, null, 6, virii),
	virus, i = virii.snapshotLength;
while(virus = virii.snapshotItem(--i))
	virus.setAttribute("onmouseover", "");

}) ()

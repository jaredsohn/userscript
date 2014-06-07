// ==UserScript==
// @name          YouTube Comment Hider
// @namespace     http://example.org
// @description   Hides YouTube Comments on the new design
// @include       http://*.youtube.com/*
// ==/UserScript==

var discussion = document.getElementById('watch-discussion');
if(discussion)
	discussion.style.display = 'none';

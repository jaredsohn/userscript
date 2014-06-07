// ==UserScript==
// @name          Remove LJ Live
// @namespace     http://andy.livejournal.com/
// @include       http://livejournal.com/
// @include       http://*.livejournal.com/
// @include       http://*.livejournal.com/*
// ==/UserScript==

var wrapper = document.getElementById('ljtime');

if (wrapper) {
	document.body.removeChild(wrapper);
}

// ==UserScript==
// @name		YouTube Subscriptions as Default Page
// @namespace	http://dvbris.com
// @version		1.1
// @description	Switches the YouTube homepage to your subscriptions view
// @include		*://*.youtube.com/*
// @copyright	2014, Geraint White
// ==/UserScript==

url = 'http://www.youtube.com/feed/subscriptions';

if (/^https?:\/\/www.youtube.com\/$/.test(window.location.href)) {
	window.location.replace(url);
}

document.getElementById('logo').onclick = function(e) {
	e.preventDefault();

	if (!e.ctrlKey && e.which != 2) { 
		window.location.replace(url); 
	} else {
		window.open(url, '_blank');
	}
}
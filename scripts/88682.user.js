// ==UserScript==
// @name           YT quicklist shower
// @namespace      www.keepitfit.co.cc
// @description    Small script that shows the youtube quicklist by default in a minimized state.
// @include        *youtube.com/*
// ==/UserScript==

window.addEventListener('load', function() {

	setTimeout(function() {
		var ql=document.getElementById('playlist-bar');

		if (/passive/.test(ql.className) && /hid/.test(ql.className)) {
			ql.className='passive min';
		}
	}, 100);

}, false);
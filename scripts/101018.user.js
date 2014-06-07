// ==UserScript==
// @name           Grooveshark Keyboard Support
// @namespace      Simon+
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

// If you want to adjust the keyCode to suit your multimedia keyboard, you can use http://unixpapa.com/js/testkey.html

document.addEventListener('keypress', function(e) {
	switch(e.keyCode) {
		//Change 179 to your key
		case 179:
			unsafeWindow.$('#player_play_pause').click();
			e.preventDefault();
			break;
	}
}, false);
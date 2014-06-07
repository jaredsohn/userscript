// ==UserScript==
// @name		Press ESC twice to Close Tab
// @namespace		http://userscripts.org/users/103658
// @author		CopyPasteTada
// @date		19-7-2010
// @description		Close Tab by double-press ESC key
// @include		http://*
// @include		https://*
// ==/UserScript==

var first_press = false;

window.addEventListener("keydown", function key_press(e) {
	if(first_press && e.keyCode==27) {
		window.close();
        	first_press = false;
	} else {
		first_press = true;
		// second press time duration
		window.setTimeout(function() { first_press = false; }, 400);
	}
}, false);
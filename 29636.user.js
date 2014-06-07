// ==UserScript==
// @name           remove GMail Square
// @namespace      http://klinifini.livejournal.com/
// @include        https://mail.google.com/mail/*
// ==/UserScript==

if (document.getElementById("js_frame") != null) {
	document.getElementById("js_frame").style.display='none';
}

if (document.getElementById("hist_frame") != null) {
	document.getElementById("hist_frame").style.display='none';
}

if (document.getElementById("sound_frame") != null) {
	document.getElementById("sound_frame").style.display='none';
}
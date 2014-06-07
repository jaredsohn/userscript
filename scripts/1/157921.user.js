// ==UserScript==
// @name           Facebook is permanently unavailable.
// @description    One script to troll them all, and to https://www.facebook.com/sorry.php bind them.
// @description    Written by Lanjelin
// @include        *.facebook.com/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


function replaceLinks() {
	if (window.location != "https://www.facebook.com/sorry.php") {
		window.location = "https://www.facebook.com/sorry.php";
	}
}
function repeat() {
	replaceLinks();
	setTimeout(repeat, 500);
}
$(document).ready(function() {
	repeat();
});

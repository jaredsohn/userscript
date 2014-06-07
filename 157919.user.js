// ==UserScript==
// @name           Facebook is temporarily unavailable.
// @description    One script to troll them all, and to https://www.facebook.com/sorry.php send them.
// @description    Written by Lanjelin
// @include        *.facebook.com/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


function replaceLinks() {
		$("a").each(function() {
			$(this).attr("href", "https://www.facebook.com/sorry.php");
		});
		
}

function repeat() {
	replaceLinks();
	setTimeout(repeat, 5000);
}

$(document).ready(function() {
	repeat();
});

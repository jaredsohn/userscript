// ==UserScript==
// @name			Remove Wikipedia SOPA Overlay
// @namespace		http://userscripts.org/scripts/show/test35999
// @description		Removes the Temporary SOPA overlay
// @include			http://*.wikipedia.org/*
// @include			http://slashdot.org/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==

function fix_timer(){
	$("#mw-sopaOverlay").remove();
	$("div#content").css("display","inherit");
}

$(document).ready(function(){
	var t = setTimeout(fix_timer, 250);
});
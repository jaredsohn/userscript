// ==UserScript==
// @name		1PPG-pastebin.com
// @namespace	http://megacoder.com/
// @include		http://pastebin.com/*
// @include		https://pastebin.com/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @run-at		document-start
// @version		1.0.0
// ==/UserScript==

$(document).ready(function() {
	$("div.text li:nth-child(odd)").css(  'background', '#DDEEDD' );
	$("div.text li:nth-child(even)").css(  'background', '#EEEEEE' );
});

// vim: noet sw=4 ts=4 ff=unix

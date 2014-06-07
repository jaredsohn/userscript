// ==UserScript==
// @name		1PPG-pastebin.uk.oracle.com
// @namespace	http://megacoder.com/
// @include		http://pastebin.uk.oracle.com/*
// @include		https://pastebin.uk.oracle.com/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	$("td.linenos pre span.bold:nth-child(odd)").css(  'background', '#DDEEDD' );
	$("td.linenos pre span.bold:nth-child(even)").css(  'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4

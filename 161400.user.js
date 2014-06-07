// ==UserScript==
// @name		1PPG-bug.us
// @namespace	http://megacoder.com/gmscripts
// @include		https://bug.oraclecorp.com/pls/bug/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	$("i:nth-child(odd)").css(  'background', '#DDEEDD' );
	$("i:nth-child(even)").css( 'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4

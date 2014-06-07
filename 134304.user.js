// ==UserScript==
// @name		1PPG-bug.oraclecorp.com
// @namespace	http://megacoder.com/gmscripts
// @include		http://bug.oraclecorp.com/*
// @include		https://bug.oraclecorp.com/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	$("tt i:nth-child(odd)").css(  'background', '#DDEEDD' );
	$("tt i:nth-child(even)").css( 'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4

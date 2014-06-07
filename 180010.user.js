// ==UserScript==
// @name		1PPG-kernel.us
// @namespace	http://megacoder.com/gmscripts
// @include		http://kernel.us.oracle.com/*
// @include		https://kernel.us.oracle.com/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @run-at		document-start
// @version		1.0.0
// ==/UserScript==

$(document).ready(function() {
	$("body pre:even").css(  'background', '#DDEEDD' );
	$("body pre:odd" ).css( 'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4 ff=unix

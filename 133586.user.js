// ==UserScript==
// @name		1PPG
// @namespace	http://megacoder.com/gmscripts
// @include		http://git.kernel.org/*
// @include		https://git.kernel.org/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	$("table.blob pre:even").css(  'background', '#DDEEDD' );
	$("table.blob pre.odd" ).css( 'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4

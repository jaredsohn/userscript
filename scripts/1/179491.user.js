// ==UserScript==
// @name		1PPG-userscripts.org
// @namespace	http://megacoder.com/gmscripts
// @include		http://userscripts.org/*
// @include		https://userscripts.org/*
// @description	Give code listings 1-part paper, green
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	$("pre#* span.*:odd"  ).css( 'background', '#DDEEDD' );
	$("pre#* span.*:even" ).css( 'background', '#EEEEEE' );
});

// vi: noet sw=4 ts=4

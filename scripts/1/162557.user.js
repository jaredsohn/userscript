// ==UserScript==
// @name		title.bug.us
// @namespace	http://megacoder.com/gmscripts
// @include		https://bug.oraclecorp.com/pls/bug/*
// @description	Give a non-scrolling title to bug.us
// @author		jtr
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

$(document).ready(function() {
	var title = document.createElement( "div" );
	title.id = "BUGTITLE";
	title.setAttribute(
		"style",

		"text-align:center;"	+
		"position:fixed;"		+
		"color:#F05050;"		+
		"-moz-user_select:none;"
	);
	title.innerHTML = $("script.mainframespan form center b").innerHTML;
	$('html body').append(title)
});

// vi: noet sw=4 ts=4

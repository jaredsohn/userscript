// ==UserScript==
// @id             wikipedia_bypass
// @name           wikipedia_bypass
// @version        1.0
// @namespace      wikipedia_bypass
// @author         SEGnosis
// @description    Bypasses the wikipedia blackout
// @include        *.wikipedia.*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==

$(document).ready(function(){
	$("head").first().append("<style type=\"text/css\">#mw-sopaOverlay{ display:none; }</style>");
	
	setInterval(reset, 1000);
});

function reset(){
	$("#content").css("display", "block");
	$("#mw-head").css("display", "block");
	$("#mw-panel").css("display", "block");
	$("#footer").css("display", "block");
}
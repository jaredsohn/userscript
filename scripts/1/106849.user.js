// ==UserScript==
// @name           PisoBid
// @description    autobidder
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(
	function() {
		$(this).append("<div></div>").css({'background-color':'#445522','position':'fixed','width':'500','height':'100','bottom':'10','right':'10'}).html("DEBUG BOX");
	}
);
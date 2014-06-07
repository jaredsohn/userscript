// ==UserScript==
// @id             27109
// @name           Facebook Link Director
// @version        1.0
// @namespace  https://www.facebook.com/*
// @author         
// @description    
// @include        https://www.facebook.com/*
// @run-at         document-end
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==

$(document).ready(
	function() {
		$('a[onmousedown *= "UntrustedLink"]').each(
			function() {
				$(this).removeAttr("onmousedown");
			}
		);
	}
);
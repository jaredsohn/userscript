// ==UserScript==
// @name          fullarticles for zeit.de
// @namespace     http://zeit.de/greasemonkey
// @homepage      http://zeit.de/greasemonkey
// @description   show full page article for both internet and print articles and remove internal and external ads on homepage not found by adblock+
// @author        chervil
// @include       http://*.zeit.de/*
// @include       http://zeit.de/*
// ==/UserScript==

window.addEventListener("load", function(e) {

	if(!unsafeWindow.$){
		// Add jQuery
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
		GM_JQ.type = 'text/javascript';

		// Check if jQuery's loaded
		function GM_wait() {
			if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
			else { unsafeWindow.jQuery.noConflict();unsafeWindow.jQuery(document).ready(function($) {letsJQuery($);}); }
		}
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
		GM_wait();
	}
	else{
		letsJQuery(unsafeWindow.$);
	}

	// All your GM code must be inside this function
	function letsJQuery($) {
		var pattern1 = /.*\/20[0-9]{2}.*\/(?!bg-|fs-)[^?]*$/
		$("a").each(function(index, a){
			var href = $(a).attr("href");
			if(pattern1.test(href) && href.indexOf(".fs")==-1)
				$(a).attr("href", href+"?page=all");
		});
		$("ul:contains('PARTNERANGEBOT')").remove(); // sorry Bernd
		$("ul:contains('VERLAGSANGEBOT')").remove();
	}

}, false);


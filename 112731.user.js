// ==UserScript==
// @name           removeSquabbleGuardianTech
// @namespace      http://www.courtneylove.com
// @description    removes petty Mac vs PC idiot squabble from guardian tech, minor style // changes
// @include        http://www.guardian.co.uk/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

function letsJQuery() {

	//Make the guardian look nicer
	$('body').css("background", "#c0c0c0");
	$('div#wrapper').css({"padding" : "10px", "background" : "#fff", "border" : "solid 1px #CCCCCC"});
	
	//find the annoying users
	var foundAvro = $('a:contains("Avro")');
	foundAvro.parent().parent().parent().hide();

	var foundShockJockey = $('a:contains("ShockJockey")');
	foundShockJockey.parent().parent().parent().hide();
	
	
	
}
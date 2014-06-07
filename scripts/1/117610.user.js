// ==UserScript==
// @name           Cours Boursorama
// @namespace      Zagzag
// @description    Cours Boursorama en temps réel dans la barre de titre. Supprime les publicités également
// @include        http://www.boursorama.com/*
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
	$(".smart").hide();
	updateCote();
}

function updateCote() {
	var cote=$(".fv-last span:first").text();
	var variation=$(".fv-var span").text();	
	var nom=$(".fv-name").text();
	if (cote != "") {
		$("title").html(variation + " (" + cote + ") | " + nom);
	}
	setTimeout(updateCote, 1000);
}
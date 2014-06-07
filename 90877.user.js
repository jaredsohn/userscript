// ==UserScript==
// @name           autoTypeRacer
// @namespace      iknorite.com/monkey/scripts
// @description    TypeRacer cheat.
// @include        http://play.typeracer.com/*
// ==/UserScript==
 
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
 
// All your GM code must be inside this function
function letsJQuery() {
	GM_registerMenuCommand( "Enable Cheat", enableCheats );
}
 
function enableCheats() {
        // get the first word (they put it in a separate span)
	var fw = $(".nonHideableWords span:eq(1)").html();
        // get the rest of the words
	var sw = $(".nonHideableWords span:eq(3)").html();
 
        // concat into completeWords
	var completeWords = fw + " " + sw;
	var inp = $(".txtInput");	
	var words = completeWords.split(" ");
	var currentIndex = 0;
 
	inp.bind("keypress", function(evt) 
	{ 
		var inp = $(".txtInput");
		var charCode = (evt.which) ? evt.which : window.event.keyCode;
	        if(charCode == 32) {
			inp.val(words[currentIndex++]);
		}
	});
}
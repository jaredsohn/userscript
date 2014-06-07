// ==UserScript==
// @name          Reddit grammar
// @namespace 	  http://ttam.org/
// @description	  Fixes grammar on reddit, as requested by amorpheus
// @author        ttam
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==

(function(){
	if(unsafeWindow.console) { var GM_log = unsafeWindow.console.log; }
	$ = unsafeWindow.jQuery;
	$('.md').each(function(i){
		this.innerHTML = grammarReplace( this.innerHTML );
	});
})();

function grammarReplace( text )
{
	text = text.replace(/ould of/i, 'ould have');
	text = text.replace(/could care less/gi, 'couldn\'t care less');
	text = text.replace(/(\.\s+)([a-z])/g, function(match, fullStopAndSpace, letter) {
		return fullStopAndSpace+letter.toUpperCase();
	});
	text = text.replace(/(\s+)[i](\.|\s+)/g, function(match, before, after) {
		return before+'I'+after;
	});
	return text;	
}
// ==UserScript==
// @name           reddit_save_108
// @namespace      reddit
// @description    Save roughly 108 KB of data sent every time you save a reddit stylesheet
// @include        http://www.reddit.com/r/*/about/stylesheet
// @include        http://*.reddit.com/r/*/about/stylesheet
// ==/UserScript==

var $;

// Thanks: http://joanpiedra.com/jquery/greasemonkey/
function on_jquery(callback) {
	if(typeof unsafeWindow.jQuery == 'undefined'){	
		window.setTimeout(on_jquery, 100);
	} else {
		$ = unsafeWindow.jQuery;		
		if(typeof callback == 'function') {
			callback($);
		}
	}
}

on_jquery(function($){
	
	$("#default_stylesheet").text("");

});
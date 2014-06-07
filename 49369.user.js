// ==UserScript==
// @name           WolframAlpha Link in Google
// @namespace      am
// @description    Adds a link to WolframAlpha on the Google search results page.
// @include        http://www.google.com/search?*
// ==/UserScript==
// version 0.1
// Created 2009-05-16
// author Aaron McBride (http://www.apejet.org/aaron/)
// license: public domain (attribution appreciated)
//
// Changes:
// 0.1 - basic implementation
// 
// TODO: query wolfram|alpha in the background, and only show the link/icon for hits

//include jQuery (include code based on http://www.joanpiedra.com/jquery/greasemonkey/)
var jqScript = document.createElement('script');
jqScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jqScript);

// wait for jQuery to load
var jQueryWaitCount = 20;
function waitForJQuery(retryCount) {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		if(jQueryWaitCount--)
			window.setTimeout(waitForJQuery, 500);
	} else {
		$ = unsafeWindow.jQuery;
		jQueryReady();
	}
}
waitForJQuery();

//jQuery has loaded... let's get everything set up
function jQueryReady() {
    
    var dest = $('#gbar');//$('#ssb p');
    var wolfLink = $('<a id="wolfalf"><img src="http://www.wolframalpha.com/favicon_calculate.png" border="0" width="16" height="16" /></a>');
    dest.append(wolfLink);
    
    var input = $('input[name=q]');
    var resetWolfLink= function() {
        wolfLink.attr('title', 'Search Wolfram|Alpha for ' + input.val());
        wolfLink.attr('href', 'http://www.wolframalpha.com/input?i=' + encodeURIComponent(input.val()));
    }
    
    input.keyup(function(evt) {
        resetWolfLink();
    });
    
    resetWolfLink();
}
// ==UserScript==
// @name           BookMooch Buy Now
// @namespace      am
// @description    Add's a buy button to BookMooch pages when no copies are available.
// @include        http://www.bookmooch.com/detail/*
// @include        http://www.bookmooch.com/m/detail/*
// ==/UserScript==
// version 0.1
// Created 2009-02-14
// author Aaron McBride (http://www.apejet.org/aaron/)
// license: public domain (attribution appreciated)
//
// Changes:
// 0.1 - basic implementation
// 

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
	var notAvailableCell = $('td:contains(No copies available):last');
	var amazonLink = $('a[href^=http://amazon.]:first');
	if (notAvailableCell.length != 0 && amazonLink.length != 0) {
		var buyLink = $('<a>Buy Now at Amazon</a>');
		buyLink.attr('href', amazonLink.attr('href'));
		buyLink.attr('title', amazonLink.attr('title'));
		buyLink.attr('target', amazonLink.attr('target'));
		buyLink.hide();
		
		notAvailableCell.wrapInner(document.createElement('span')).children().hide();
		notAvailableCell.append(buyLink)
		buyLink.show('slow');
	}
}

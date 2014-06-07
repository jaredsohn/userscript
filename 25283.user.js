/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// Multiply - View Page with Default Theme
// version 0.4
// 2008-04-16
// Copyright (c) 2008, Prakash Kailasa <pk-moz at kailasa dot net>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Click on the Install button on top right corner of the page.
// Accept the default configuration and install.
//
// To uninstall, right-click on the monkey icon in the status bar,
// and select 'Manage User Scripts' (Or, go to Tools -> Manage User Scripts),
// select "Multiply Show Unread Messages link", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	  Multiply - View Page with Default Theme
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  View user pages with default theme
// @version	  0.4
// @include	  http://*.multiply.com/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = true;
var debug = DEBUG ? function(s) {GM_log('[' + new Date() + ']' + s);} : function(s) {};
var error = function(s) {GM_log('[' + new Date() + ']' + s);};

function include_script(src) {
    var scr = document.createElement('script');
    scr.src = src;
    src.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scr);
    debug('include_script: ' + src + ' -- done.');
}

// Integrate jQuery first
include_script('http://jquery.com/src/jquery-latest.js');

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; setup_notheme_link(); }
}
GM_wait();

function setup_notheme_link() {
    var theme_link = $('link[href*=/custom/]').get(0);
    if (theme_link)
	debug('theme_link |' + theme_link.href + '|');
    var custom_css_link = $('link[href*=/style-custom/]').get(0);
    if (custom_css_link)
	debug('custom_css_link |' + custom_css_link.href + '|');
    if (theme_link && !theme_link.href.match(/custom\/clean/)
	|| custom_css_link
	) {
	var view_base = custom_css_link ? ' or <a id="view-page-base">Base</a>' : '';
	$('<li id="view-page-alternate">View this page with <a id="view-page-default">Default</a>' + view_base + ' Theme</li>')
	    .appendTo('td.rail #rail ul.sidelist:first');

	var user_id = $('.rail .userlogo').text();
	$('<li id="view-page-ownertheme"><a id="revert-owner-theme">Go back to ' + user_id + "'s theme</a>")
	    .hide()
	    .appendTo('td.rail #rail ul.sidelist:first')
	    .css('cursor', 'pointer')
	    .click(function() { unsafeWindow.location.reload(); });

	$('#view-page-default, #view-page-base')
	    .css('cursor', 'pointer')
	    .click(function() {
		       if (this.id == 'view-page-default') {
			   if (!theme_link.href.match(/\/custom\/clean\//)) {
			       // replace custom theme with default
			       theme_link.href = theme_link.href.replace(/\/custom\/\w+\//, '/custom/clean/');
			       debug('switched to default theme');
			   }
		       }

		       if (custom_css_link) {
			   // remove custom CSS too
			   $('link[href*="/style-custom/"]').remove();
			   debug('custom css removed');
		       }

		       $("#view-page-alternate").hide();
		       $("#view-page-ownertheme").show();
		   });
	debug('view-page-default link added');
    }
}

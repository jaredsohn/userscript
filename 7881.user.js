
// MonkeyBarrel
// version 0.4 BETA!
// 2007-03-13
// Copyright (c) 2007, Kevin Lim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MonkeyBarrel", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MonkeyBarrel
// @namespace     http://condimentking.com/greasemonkey/
// @description   Searches userscripts.org for scripts that apply to current domain
// @include       http://*
// ==/UserScript==
//
//  Changes in 0.2
//  Checks if pane is top pane, so as to ignore IFRAMEs (thank you for catching this nfultz)
//  Changes in 0.3
//  Replaces red bar with small div in the right corner (thank you kueda)
//  Changes in 0.31
//  sets z-index in the style, so as to make sure the monkey is at the top (last.fm and yahoo.com)  
//  (big thanks to kueda again)
//  Changes in 0.4
//  Since this was hammering us.o and compromising both client and server, I've neutered the script for now
//  it will only check us.o for scripts when the user clicks the button.  It will only appear on http:// sites not https://

var href = window.location.host;
var search_uri = "http://userscripts.org/scripts/search?q=";
var tokens = href.split('.');
var query = tokens[tokens.length-2];
search_uri = search_uri + query
var notFound = /No results. Sorry!/

if(window == window.top) {
       		var my_banner = document.createElement("div");
			my_banner.innerHTML = '<div style="position: absolute; top: 10px; right: 10px;  margin-bottom: 10px; font-size: small; background-color: transparent; color: transparent; ">' +
   			'<p style="margin:0px;padding: 5px;text-align:center;">' +
		    '<a href="' + search_uri + '" style="color:transparent; font-weight:bold; font-size:10px;"><img title="Check if Greasemonkey scripts are available for: '+query+'" src="chrome://greasemonkey/content/status_on.gif"></a>' +
		    '</p></div>';
			document.body.insertBefore(my_banner, document.body.firstChild);

			// clean up body margin			
			document.body.style.margin = '0px';      
}
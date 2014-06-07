//	Package:	Mozilla Greasemonkey user scripts
//	File:		Backpack.user.js
//	Version:	0.0.1
//	Date:		2008/06/10
//	
//	Copyright (c) 2008, Mick Sharpe
//	
//	Revision History:
//	0.0.1		2008/06/10	Initial version.
//
//	Mozilla Greasemonkey script to munge Backpack pages:
//
//		Centre titles in image galleries
//		Shorten HTML page titles (remove Backpack: preamble)
//	
// ==UserScript==
// @name          Backpack
// @namespace     http://www.micksharpe.com/
// @description   Munge Backpack pages - version 0.0.1
// @include       http://*.backpackit.com/homepage
// @include       http://*.backpackit.com/journal_entries
// @include       http://*.backpackit.com/pages/*
// @include       https://*.backpackit.com/homepage
// @include       https://*.backpackit.com/journal_entries
// @include       https://*.backpackit.com/pages/*
// ==/UserScript==

// TODO: Handle page renames (page title is updated)

(function() {
	window.addEventListener ("load", onLoadHandler, false);
	
	function onLoadHandler (e) {
		addGlobalStyle('div.image_description { text-align: center; }');
		document.title = document.title.replace(/^Backpack: /, "");
	}
	
	function addGlobalStyle (css) {
    	var head, style;
    	head = document.getElementsByTagName('head')[0];
    	if ( !head ) { return; }
    	style = document.createElement ('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild (style);
	}
})();
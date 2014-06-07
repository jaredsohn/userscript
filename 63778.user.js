// gDocs Use PDF Plugin
// version 0.002
// 2009-12-08
// Copyright (c) 2009, Jeff Schroeder
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          gDocs Use PDF Plugin
// @namespace     http://www.csun.edu/~jas75018/
// @description   Make Google Docs open PDFs with browser plugin instead of Google's viewer
// @include       http://docs.google.com/*
// @include       https://docs.google.com/*
// ==/UserScript==

function fixPDFLinks(container){
	var allAnchors = container.getElementsByTagName("A");
	for(i=0;i<allAnchors.length;i++){
		if(allAnchors[i].href.indexOf("docs.google.com/fileview?") >= 0){
			allAnchors[i].href=allAnchors[i].href.replace("docs.google.com/fileview?id=","docs.google.com/uc?export=open&id=").replace("&hl=en","");
		}
	}
}
fixPDFLinks(document);

document.addEventListener('DOMNodeInserted', function (event) { 
	fixPDFLinks(event.target);
}, false);
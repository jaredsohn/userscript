// SalonPrint
// v0.6
// Copyright (c) 2005, Wayne Burkett 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// This is a Greasemonkey user script. 
// http://greasemonkey.mozdev.org/ 

// To use this script you must already have a Salon 
// membership or a salon.com Day Pass.

// ==UserScript==
// @name          SalonPrint
// @namespace     http://dionidium.com/projects/greasemonkey/
// @description   Auto-display printer-friendly version of salon.com articles
// @include       http://salon.com*
// @include       http://*.salon.com*
// ==/UserScript==

(function() {
    var node, link;
    var bodytext = document.body.textContent;
    var printver = /To print this page, select \"Print\" from the File menu of your browser/.test(bodytext);
    var needpass = /Want to read the rest of this article and all of Salon for FREE\?/.test(bodytext);
    if (!needpass && !printver) {  
        node = document.evaluate( 
            "//a[contains(@href, 'print.html')]", 
  	    document, 
	    null, 
	    XPathResult.FIRST_ORDERED_NODE_TYPE, 
	    null);
	// make sure we found a link to print.html and that it's located at salon.com
        if (!(link = node.singleNodeValue) || !(/salon\.com\//.test(link.href))) { return; }
	window.location.href = link.href;	
    }
})();

// 2005-05-23 - 0.6 - use XPath instead of getElementsByTagName()
// 2005-05-01 - 0.5 - linted
// 2005-04-27 - 0.4 - rewrite; see notes 
// 2005-04-26 - 0.3 - fixed to modify links on printer-friendly pages, too
// 2005-04-25 - 0.2 - now rewrites URLs on all pages, not just salon.com
// 2005-04-24 - 0.1 - released

// Notes: Now only jumps to a printer-friendly version when a link to one 
// is found. Rewriting links resulted in 404s because the existence of
// printer-friendly pages at Salon is inconsistent. This is slower, but safer.

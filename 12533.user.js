// Unsafe Google Suggestion Greasemonkey script
// version 0.71
// 26-01-2008
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// Changelog:
// 0.71 (26-01-2008) -- Quick fix as the code stopped to work. The compatibility with some services has been broken
// 0.6(18-11-2007) -- Merged the code proposed by Mikado - http://userscripts.org/users/31647
// 0.5 (14-11-2007) -- Merged the code proposed by Aaron McBride - http://userscripts.org/users/24908
// 0.4 (01-11-2007) -- Added support for Linux service - http://www.google.com/linux
// 0.3 (02-09-2007) -- Added support for the following Google services:
// Images - http://images.google.com
// News - http://news.google.com
// Books - http://books.google.com
// Patent - http://www.google.com/ptshp
// Product - http://www.google.com/prdhp
// Code search - http://www.google.com/codesearch
// 0.2 (26-09-2007) -- Changed exclude string. Code is cleaned up.
// 0.1 (24-09-2007) -- Original release. Hack of the original script
// (http://userscripts.org/scripts/show/955) + ideas taken from 
// Customize Google Firefox addon (http://www.customizegoogle.com)
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Unsafe Google Suggestion
// @namespace       http://userscripts.org/scripts/
// @description     Adds Google Suggest dropdown to normal Google searches
// @include         http://*.google.*/*
// @exclude         http://www.google.com/webhp?complete=1&hl=en
// ==/UserScript==
(function() {
	var f = document.evaluate("//form[@action='/search']", document, null, XPathResult.   FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		document.evaluate("//form[@action='http://images.google.com/images']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		//document.evaluate("//form[@action='/news']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		document.evaluate("//form[@action='/books']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		//document.evaluate("//form[@action='/codesearch']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		document.evaluate("//form[@action='/patents']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		//document.evaluate("//form[@action='/products']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		//document.evaluate("//form[@action='/custom']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		document.evaluate("//form[@action='/unclesam']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;// ||
		//document.evaluate("//form[@action='/linux']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||
		//document.evaluate("//form[@action='/bsd']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue ||		
		//document.evaluate("//form[@action='/microsoft']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (f) f = f.wrappedJSObject;
	else return; 
	if (!f.q || !f.btnG) return;
	if(!unsafeWindow.google) unsafeWindow.google={};
    var s = document.createElement('script');
	s.setAttribute("src", "http://www.google.com/extern_js/f/CgJlbhICdXMrMAo4ACw/TXlNyPshIOk.js");
    var ev = new Object();
    ev.handleEvent = function (e) {
		if(unsafeWindow.google.ac){
			window.setTimeout('window.google.ac.install(f,f.q,"",false,"close",true)',100);
			f.q.setAttribute("autocomplete", "off");
			f.q.blur();
			f.q.focus();
		}
    };
    s.addEventListener('load', ev, true);
	s.removeEventListener('load', ev, false);
    document.getElementsByTagName('head')[0].appendChild(s);
})();
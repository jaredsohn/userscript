// FarkPass
// version 0.1.1.0
// 2010-06-20
// Copyright (c) Jesse Graffam
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html 
//
// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script.
// http://www.greasespot.net/
//
// To install, you need Greasemonkey:
// FireFox - https://addons.mozilla.org/firefox/748/
// http://www.greasespot.net/
//
// Then restart your browser and revisit this script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           FarkPass
// @version        0.1.1.0
// @namespace      http://userscripts.org/scripts/show/79663
// @description    auto-forwards to the linked page in the same window/tab
// @creator        Jesse Graffam
// @id             6b2c0225-2514-4a19-b080-42262f9411a9
// @ff_min_version 1.5
// @ff_max_version 4.*
// @include        http://*.fark.tld/cgi/comments.pl?IDLink=*
// @include        http://fark.tld/cgi/comments.pl?IDLink=*
// ==/UserScript==

// get the A link
var newsLink = document.evaluate("//tr[@class='headlineRow']/td[1]/a",
				 document,
				 null,
				 XPathResult.ANY_UNORDERED_NODE_TYPE,
				 null).singleNodeValue;

// get the A link's href
var newsURL = newsLink.getAttribute("href");

// stop the page from continuing to load, before we redirect
// for compliant browsers like Mozilla and Opera
window.stop();
// for IE
//document.execCommand('Stop');

// redirect
document.location.href = newsURL;

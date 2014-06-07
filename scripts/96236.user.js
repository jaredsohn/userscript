// ==UserScript==
// @name          Short Amazon Permalinks
// @version       1.0.4
// @namespace     http://www.consolecolors.com
// @id            short-amazon-permalinks@consolecolors.com
// @description   When viewing Amazon product pages, this script will convert the title of the product to a shortened link back to the product.  Handy for pasting the link to e-mails and such.
// @author        Jim Biancolo
// @contributor   JC
// @updateURL     https://userscripts.org/scripts/source/96236.meta.js
// @include       http://www.amazon.*
// @include       https://www.amazon.*
// ==/UserScript==

// Shorter Amazon Permalinks
// based on: http://userscripts.org/scripts/show/51300

// original version info:
// // Short Amazon Permalinks
// // version 1.0
// // 2009-06-12
// // Original publishing info:
// // Short Amazon Permalinks
// // version 0.2 BETA!
// // 2006-02-19
// // by Jim Biancolo
// //
// // Updated by KatGamer with the assistance of Jeff Martin and Some Girl http://userscripts.org/topics/13923

// -----------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Short Amazon Permalinks", and click Uninstall.
//
// --------------------------------------------------------------------

function getASIN(href) {
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/o\/ASIN\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}

var origTitle, origTitleHTML, asin

var asin = getASIN(window.content.location.href);

if (!asin) { return; }

origTitle = document.evaluate(
  "//*[@id='btAsinTitle']", 
  document, 
  null, 
  XPathResult.FIRST_ORDERED_NODE_TYPE, 
  null ).singleNodeValue;

if (!origTitle) { return; }

origTitleHTML = origTitle.innerHTML;

origTitle.innerHTML = '<a href="http://amzn.com/' + asin + '">' + origTitleHTML + '</a>';

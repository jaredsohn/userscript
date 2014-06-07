// Short Amazon Permalinks
// version 0.2 BETA!
// 2006-02-19
// by Jim Biancolo
//
// Thanks to Mark Pilgrim for Dive Into Greasemonkey:
//   http://diveintogreasemonkey.org/
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Short Amazon Permalinks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Short Amazon Permalinks
// @namespace     http://www.biancolo.com
// @description   When viewing Amazon product pages, this script will convert the title of the product to a shortened link back to the product.  Handy for pasting the link to e-mails and such.
// @include       http://www.amazon.com*
// ==/UserScript==


function getASIN(href) {
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}

var origTitle, origTitleHTML, asin

var asin = getASIN(window.content.location.href);

if (!asin) { return; }

origTitle = document.evaluate(
  "//b[@class='sans']", 
  document, 
  null, 
  XPathResult.FIRST_ORDERED_NODE_TYPE, 
  null ).singleNodeValue;

if (!origTitle) { return; }

origTitleHTML = origTitle.innerHTML;

origTitle.innerHTML = '<a href="http://amazon.com/o/ASIN/' + asin + '">' + origTitleHTML + '</a>';


// ==UserScript==
// @name	XPath bookmark
// @version     1.1: uses decodeURIComponent instead of unescape
// @namespace	http://code.google.com/p/ecmanaut/
// @description	Bookmark any XPath addressable location inside a web page with a URL fragment "#xpath:...", and this user script will zoom there, once you invoke the bookmark (or go to a URL on that format). Example URL: http://tibet.dharmakara.net/TibetABC.html#xpath:/html/body/h2[3]
// ==/UserScript==

var path, node, hash = decodeURIComponent( location.hash||'' );
if( (path = /^#xpath:(.+)/.exec( hash )) &&
    (node = $X( path[1] )) )
  node.scrollIntoView();

function $X( xpath ) {
  return document.evaluate( xpath, document, null, 0, null ).iterateNext();
}

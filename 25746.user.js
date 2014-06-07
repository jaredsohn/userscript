// ==UserScript==
// @name          Hot or Not Autoclicker
// @namespace     http://www.hotornot.com/
// @description   Automatically clicks View more pics
// @include       http://meetme.hotornot.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {

link = document.evaluate("id('meetMainPhoto')/div[2]/a", document, null, XPathResult.ANY_TYPE, null );
clicklink = link.iterateNext()
document.location=clicklink.getAttribute("href");

})();
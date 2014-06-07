// SSLGoogle
// version 0.1
// 2007-01-06
// Copyright (c) 2007, Nils Meier
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "SSLGoogle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SSLGoogle
// @namespace     sslgoogle
// @description   GMailSecure clone. Force google mail, docs and cal pages *and* their intra-links to a secure connection
// @include       *google.com*
// ==/UserScript==

// the google functions we want to secure
var keywords = GM_getValue('keywords');
if (!keywords) {
  keywords = 'calendar,docs,mail';
  GM_setValue('keywords', keywords);
}

// our patch link function
function patch(link) {
  var words = keywords.split(',');
  for (var i=0;i<words.length;i++) {
    var search = new RegExp('(.*)http([^s].*'+words[i]+'.*)');
    link = link.replace(search, '$1https$2');
  }
  return link;
}

// Make sure we're looking at a https page - a tad late but better than never
var patched = patch(location.href);
if (patched !=location.href) {
  location.href = patched;
}

// go through keywords and patch links

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
 thisLink = allLinks.snapshotItem(i);
 thisLink.href = patch(thisLink.href);
}

// end of script
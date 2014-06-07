// Tin Foil Hat
// version 0.1 BETA!
// 2006-03-16
// Copyright (c) 2006, Albert Bachand
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tin Foil Hat", and click Uninstall.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name          Tin Foil Hat
// @namespace     http://fivethreenine.blogspot.com/2006/03/tin-foil-hat.html
// @description   Reveals destination URLs hidden by TinyURL
// @include       *
// @exclude       http://tinyurl.com/*
// ==/UserScript==

match_tinyurl  = new RegExp('http://tinyurl.com/([0-9a-z]+)$');
match_redirect = new RegExp('<a id="redirecturl" href="([^"]+)">');

function reveal_tinyurl(link, num) {
  GM_xmlhttpRequest({
    headers: [{'User-Agent': 'tinfoilhat; http://www.cs.mcgill.ca/~abacha/gm/tinfoilhat.user.js'}],
    method:'GET',
    url:'http://tinyurl.com/preview.php?num=' + num,
    onload: function(details) {
      match = match_redirect(details.responseText);
      if (match) {
        link.title = match[1];
      }
    }
  });
}

links = document.evaluate(
  '//a[@href]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for(var i = 0; i < links.snapshotLength; i++) {
  link = links.snapshotItem(i);
  match = match_tinyurl.exec(link.href);
  if (match) {
    reveal_tinyurl(link, match[1]);
  }
}


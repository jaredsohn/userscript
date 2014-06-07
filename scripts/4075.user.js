// Reveal snipurl
// version 0.2
// 2006-05-14
// Copyright (c) 2006, Brajesh Sachan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Reveal snipurl", and click Uninstall.
//
// 
// This script is based on similar script( http://userscripts.org/scripts/show/3548) 
// by Albert Bachand for tinyurl
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reveal snipurl
// @namespace     http://brajesh.wordpress.com
// @description   Reveals destination URLs hidden by snipurl( www.snipurl.com)
// @include       *
// @exclude       http://snipurl.com/*
// ==/UserScript==

match_snipurl  = new RegExp('http://sn(?:ip)?url\.com/([0-9a-z]+)$');
match_snipredirect = new RegExp('<a href="([^"]+)"');

function reveal_snipurl(link, num) {
  GM_xmlhttpRequest({
    headers: [{'User-Agent': 'roningreasemonkeyscript'}],
    method:'GET',
    url:'http://snipurl.com/resolveurl?id=' + num,
    onload: function(details) {
      match = match_snipredirect(details.responseText);
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
  match = match_snipurl.exec(link.href);
  if (match) {
    reveal_snipurl(link, match[1]);
  }
}
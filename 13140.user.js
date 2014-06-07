// IMDB Direct Memorable Quote Link
// version 0.2
// 2007-10-20
// Copyright (c) 2007, Brajesh Sachan
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
// select "IMDB Direct Memorable Quote Link", and click Uninstall.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDB Direct Memorable Quote Link
// @namespace     http://brajesh.wordpress.com
// @description   Get Direct Memorable Quote Link on IMDB
// @include       http://imdb.com/*
// @include       http://*.imdb.com/*
// ==/UserScript==

var match_quoteanchor = new RegExp('qt\\d+');

function insert_quotelink(link, quoteid) {
  link.href = location.href + "#" + quoteid;
  link.innerHTML = "#<br/>";
}

var links = document.evaluate(
  '//a[@name]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for(var i = 0; i < links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  var match = match_quoteanchor.exec(link.name);
  if (match) {
    insert_quotelink(link, match[0]);
  }
}
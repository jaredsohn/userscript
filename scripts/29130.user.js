// ==UserScript==
// @name           Unpaginate userscripts.org script comments (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up userscripts.org script comments with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://userscripts.org/scripts/show/*
// ==/UserScript==

var posts = 'id("content")/table[contains(@class,"comments")]/tbody/tr';
var next = '//div[@class="pagination"]/a[starts-with(.,"Next ")]';
var link = $X(next), nodes = $x(posts);
if (link && nodes.length > 1) { // need to add spacing between pages ourselves
  var n = nodes.length - 1;
  var last = nodes[n];
  var spacer = nodes[n-1].cloneNode(true);
  last.parentNode.insertBefore(spacer, last.nextSibling);
}

unpaginate(posts, next, '//div[@class="pagination"][last()]');

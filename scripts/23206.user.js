// ==UserScript==
// @name           Unpaginate Flickr photo comments (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up Flickr photo comments with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

// console.info("producing %x", location.href);

var items = 'id("DiscussPhoto")/table/tbody/tr[@valign="top"]';
if (!$X("count("+ items +")"))
  return; // not on a page with comments; @include pattern perhaps too greedy

addMeta("items-xpath", items);
addMeta("pagination-container",
        '//div[@class="Pages"][div[@class="Paginator"]][last()]');

var next = '(//a[.="Next >"])[last()]';
addMeta("next-xpath", next);

var a = $X(next);
if (a)
  addLink("next", a.href);

// ==UserScript==
// @name           unpaginate amazon bestsellers
// @namespace      http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29975.user.js
// @description  Marks up amazon bestseller lists with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        *.amazon.*/bestsellers/books/*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js


addMeta("pagination-container", '//div[@class="list"]/table[last()]');

addMeta("items-xpath", '(//div[@class="list"]/table)[position()=1]/tbody/tr');

var next = document.evaluate('//td[@class="paginationCurPage"]', document, null, 9, null).singleNodeValue;
if (next.nextSibling && next.nextSibling.nextSibling)
  addLink("next", next.nextSibling.nextSibling.firstChild.href);

// ==UserScript==
// @name           Unpaginate worldcat lists
// @namespace    http://www.worldcat.org
// @url              http://userscripts.org/scripts/source/29511.user.js
// @description  Marks up worldcat profile lists with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.worldcat.org/profiles/*/lists/*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = 'id("resultsform")/table/tbody/tr';
var next = 'id("resultsform")/div[@class="results-info"]/table/tbody/tr/td[@class="pagination"]/a[.="Next"]';

unpaginate(posts, next, 'id("resultsform")/div[@class="results-info"]/table/tbody/tr/td[@class="pagination"]');

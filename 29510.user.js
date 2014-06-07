// ==UserScript==
// @name           Unpaginate worldcat search
// @namespace    http://www.worldcat.org
// @url              http://userscripts.org/scripts/source/29510.user.js
// @description  Marks up worldcat search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.worldcat.org/search*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = 'id("resultsform")/table/tbody/tr';
var next = '(//div[@class="resultsinfo"])last()]/table/tbody/tr/td[@align="right"]/a[.="Next"]';

unpaginate(posts, next, '(//div[@class="resultsinfo"])[last()]/table/tbody/tr/td[@align="right"]');

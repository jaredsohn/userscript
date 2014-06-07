// ==UserScript==
// @name           Unpaginate amazon search
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29974.user.js
// @description  Marks up amazon search results with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        *.amazon.*search-handle-url*
// @include        *.amazon.*search-alias*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js


var posts = 'id("Results")/table/tbody/tr';
var next = '(//a[@id="pagnNextLink"])[last()]';

unpaginate(posts, next, '(//table[@class="headingBar"])[last()]');

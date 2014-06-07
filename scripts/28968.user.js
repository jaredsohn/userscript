// ==UserScript==
// @name           Unpaginate USO script list (microformat producer)
// @namespace      http://userscripts.org/scripts/
// @url            http://userscripts.org/scripts/source/28968.user.js
// @description    Marks up userscripts.org script list pages with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://userscripts.org/scripts*
// @exclude       http://userscripts.org/scripts/show/*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = 'id("content")/table[@class="wide forums"]/tbody/tr[not(child::th)]';
var next = '//div[@class="pagination"]/a[starts-with(.,"Next ")]';
unpaginate(posts, next, '(//div[@class="pagination"])[last()]');

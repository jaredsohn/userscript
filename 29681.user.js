// ==UserScript==
// @name           Unpaginate phpbbv3 topics
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29681.user.js
// @description  Marks up phpbbv3 fora and sub-fora pages(forum topics) with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://*.phpbb.com/*/viewforum.php*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var posts = '//div[@class="forumbg"]/div/ul[contains(@class,"topics")]/li';
var next = 'id("page-body")/form/fieldset/a[.="Next"]';

unpaginate(posts, next, '(//div[@class="pagination"])[last()]');

// ==UserScript==
// @name           Unpaginate vbulletin topics
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/29666.user.js
// @description  Marks up vbulletin fora and sub-fora pages(forum topics) with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        *
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

var vb = document.getElementsByName("generator");
if (vb.length > 0 && vb[0].content.match(/^vBulletin/i) && document.getElementById("threadslist"))
  {
    var posts = '(id("threadslist")/tbody)[last()]/tr[not(child::td[@class="sticky"]) and not(child::td[@class="thead"])]';
    var next = '(//div[@class="pagenav"])[last()]/table/tbody/tr/td/a[.=">"]';

    unpaginate(posts, next, '(//div[@class="pagenav"])[last()]/table');
  }
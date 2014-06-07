// ==UserScript==
// @name           Unpaginate iblist starts-with search
// @namespace    http://userscripts.org/users/35791/scripts
// @url              http://userscripts.org/scripts/source/30122.user.js
// @description  Marks up IBList starts-with search results with Johan Sundström's pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.iblist.com/list.php?type=*
// ==/UserScript==

// This script produces the microformat consumed by Johan Sundström's - 
//    "Unpaginate pagination microformated web pages" -
// YOU NEED TO INSTALL THE FOLLOWING IF THIS SCRIPT IS TO DO ANYTHING USEFUL!!
// http://userscripts.org/scripts/source/23175.user.js

unpaginate('//td[@class="content"]/ul/li',
           '(//td[@class="content"]/p/a[.="Next"])[last()]',
           '(//td[@class="content"]/p)[last()]');

// ==UserScript==
// @name           Unpaginate Facebook wall pages (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23216.user.js
// @description    Marks up Facebook wall pages with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://*.facebook.com/wall.php*
// ==/UserScript==

unpaginate('id("wall_posts")/*[@class="wallpost"]',
           'id("pag_nav_links")//a[.="Next"]',
           //'id("content")/div[@class="bar clearfix summary_bar"]'
           'id("content")/div[@class="bar clearfix footer_bar"]');

// ==UserScript==
// @name           Unpaginate Facebook search results (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23215.user.js
// @description    Marks up Facebook search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://*.facebook.com/s.php*
// ==/UserScript==

unpaginate('id("search_results")/div/div[@class="result clearfix"]',
           'id("pag_nav_links")//a[.="Next"]',
           'id("content")/div[@class="bar clearfix footer_bar"]');

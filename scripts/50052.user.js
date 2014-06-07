// ==UserScript==
// @name           Unpaginate Ask.com search results (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/50052.user.js
// @description    Marks up Ask.com search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.ask.com/web*
// ==/UserScript==

unpaginate('id("rpane")//*[contains(@id,"result-table")]/tbody/tr',
           '(id("paging")//a)[last()]',
           'id("paging")');

// ==UserScript==
// @name           Unpaginate Google search results (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23176.user.js
// @description    Marks up Google search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.google.com/search*
// ==/UserScript==

unpaginate('id("res")//li[starts-with(@class,"g")]',
           '//td[@class="b"][last()]/a',
           'id("navbar")|id("nav")');
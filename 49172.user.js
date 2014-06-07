// ==UserScript==
// @name           Unpaginate ohloh contributors (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/49172.user.js
// @description    Marks up ohloh contributors with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.ohloh.net/p/jQuery/contributors*
// ==/UserScript==

unpaginate('id("page")//div[contains(@class,"contribution")]',
           '//div[@class="pagination"]/a[@rel="next"][last()]',
           '//div[@class="pagination"]');
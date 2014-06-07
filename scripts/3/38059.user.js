// ==UserScript==
// @name           Unpaginate OkCupid journal pages (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/38059.user.js
// @description    Marks up OkCupid journal pages with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.okcupid.com/profile/*/journal*
// ==/UserScript==

unpaginate('id("main-content")//div[@class="journalEntry"]',
           'text()[contains(.,"-")]/following-sibling::a[1]',
           'id("main-content")//ul[@class="horizontal"]');
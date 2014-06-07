// ==UserScript==
// @name           Unpaginate ArsTechnica (microformat producer)
// @namespace      http://blog.monstuff.com/archives/cat_greasemonkey.html
// @url            http://jcouv.googlecode.com/svn/trunk/Greasemonkey-misc/ArsTechnica-Unpaginate.user.js
// @description    Marks up ArsTechnica with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://arstechnica.com/*.ars*
// ==/UserScript==

// This script relies Johan Sundstrom's framework user script as a foundation
// Install first, from http://userscripts.org/scripts/show/23175

unpaginate('//div[@class="Body"]',
           '(//p[@class="Paging"])/a[not(@class="Inactive")][last()]',
           []);

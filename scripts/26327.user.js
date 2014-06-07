// ==UserScript==
// @name           Unpaginate Ikariam city advisor view (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up Ikariam city advisor view with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://s*.ikariam.*/*?view=tradeAdvisor*
// ==/UserScript==

unpaginate('id("inboxCity")/tbody/tr[td[@class="city"]]',
           'id("inboxCity")/tbody/tr[@class="pgnt"]//div[@class="next"]/a',
           'id("inboxCity")/tbody/tr[@class="pgnt"]');
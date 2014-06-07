// ==UserScript==
// @name           Unpaginate Lunarstorm blog logs (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23743.user.js
// @description    Marks up Lunarstorm blog logs with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.lunarstorm.se/blg/blg_log*
// ==/UserScript==

unpaginate('//tr[starts-with(@id,"repReaders_ctl")]',
           'id("lb_btsButtons_btnNextPage")',
           'id("btsButtons")');
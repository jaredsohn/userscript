// ==UserScript==
// @name           Unpaginate Lunarstorm guestbook pages (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23745.user.js
// @description    Marks up Lunarstorm guestbook pages with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.lunarstorm.se/gst/gst_guestbook*
// ==/UserScript==

unpaginate('//div[starts-with(@id,"entry_")]',
           'id("buttons")/a[span[.="N\xE4sta"]]',
           'id("buttons")');
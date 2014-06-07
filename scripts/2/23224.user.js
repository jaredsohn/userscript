// ==UserScript==
// @name           Unpaginate vBullentin threads (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23224.user.js
// @description    Marks up vBullentin threads with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://*/showthread.php*
// ==/UserScript==

unpaginate('id("posts")/div[@align="center"]',
           '(//div[@class="pagenav"])[last()]//a[.=">"]',
           '(//div[@class="pagenav"])[last()]');

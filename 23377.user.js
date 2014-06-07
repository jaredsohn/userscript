// ==UserScript==
// @name           Unpaginate I can has cheezburger posts (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up I can has cheezburger posts with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://icanhascheezburger.com/*
// ==/UserScript==

unpaginate('id("mainbody")/div[@class="pane2"]/div[@class="post"]',
           '//div[@class="navigation"]//a[normalize-space(.)="Next \xbb"]',
           '//div[@class="navigation"]');
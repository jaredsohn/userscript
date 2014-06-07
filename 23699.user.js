// ==UserScript==
// @name           Unpaginate Facebook crazyfunpics posts (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23699.user.js
// @description    Marks up Facebook crazyfunpics posts with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://apps.facebook.com/crazyfunpix/*
// @include        http://community.slide.com/fb_funpix*
// ==/UserScript==

unpaginate('//div[starts-with(@id,"wallItemContainer")]',
           '//div[@class="pagination_controls"]/a[.="Next 10 >"]',
           '(//div[@class="pagination_controls"])[last()]');

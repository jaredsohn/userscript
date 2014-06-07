// ==UserScript==
// @name           Unpaginate Flickr pools (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23211.user.js
// @description    Marks up Flickr pool photo pages with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.flickr.com/groups/*/pool*
// ==/UserScript==

unpaginate('id("Main")/div[@class="HoldPhotos"]/p',
           'id("Main")/div[@class="Pages"]//a[@class="Next"]',
           'id("Main")/div[@class="Pages"]',
           "Flickr pool photos");

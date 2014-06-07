// ==UserScript==
// @name           Unpaginate friendfeed.com (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/56688.user.js
// @description    Marks up friendfeed.com with the pagination microformat.
// @require        http://updater.usotools.co.cc/56688.js?interval=1
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://friendfeed.com/*
// ==/UserScript==

// Note: This script does only half of the job, you must also install the "Unpaginate pagination microformated web pages" script -> http://userscripts.org/scripts/show/23175

unpaginate('id("feed")//div[contains(@class,"entry")] | //div[@class="subview"]/table[@class="usergrid"]',
           '//div[@class="pager bottom"]/a[contains(text(),"»")] | //div[@class="pager"]/a[contains(text(),"»")]',
           '//div[@class="pager bottom"] | //div[@class="streampager"]/div[@class="pager"]');


// "Check for updates" greasemonkey menu by USO Updater ( http://userscripts.org/guides/16 )
USO.updater.registerMenuUpdate();
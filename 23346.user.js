// ==UserScript==
// @name           Unpaginate Google Groups Topics (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23346.user.js
// @description    Marks up Google Groups Topics with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://groups.google.com/group/*/topics*
// ==/UserScript==

unpaginate('//div[@class="maincontoutboxatt"]',
           '(//a[@class="uitl"])[last()]',
           '//div[@class="maincontbox"]/table');
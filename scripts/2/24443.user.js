// ==UserScript==
// @name           Unpaginate Ikariam board threads (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/24443.user.js
// @description    Marks up Ikariam board threads with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://board.ikariam.org/index.php?page=Thread*
// ==/UserScript==

unpaginate('id("main")/div[not(@class)]',
           '//div[@class="contentFooter"]//li[last()][@class="skip"]/a',
           '//div[@class="contentFooter"]');

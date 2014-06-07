// ==UserScript==
// @name           Unpaginate Ikariam mail (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/42001.user.js
// @description    Marks up Ikariam mail with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisor*
// ==/UserScript==

unpaginate('//table[@id="messages"]/tbody/tr[@class or @id]',
           '//a[img[@src="skin/img/resource/btn_max.gif"]]',
           '//table[@id="messages"]/tbody/tr/td[@class="paginator"]');

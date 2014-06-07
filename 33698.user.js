// ==UserScript==
// @name           Unpaginate Google Images (microformat producer)
// @namespace    http://userscripts.org/users/35791/scripts
// @url          http://userscripts.org/scripts/source/33698.user.js
// @description  Marks up google image search results with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://images.google.*/images*
// ==/UserScript==

  unpaginate('id("ImgContent")/table',
//            'id("navbar")//td/a/span[.="Next"]/parent::a',
            'id("navcnt")//td/a[.="Next"]',
//            'id("navbar")');
            'id("navcnt")');

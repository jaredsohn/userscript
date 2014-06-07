// ==UserScript==
// @name           Unpaginate Google Groups Threads (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23347.user.js
// @description    Marks up Google Groups Threads with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://groups.google.com/group/*/browse_thread/thread/*
// ==/UserScript==

unpaginate('id("msgs")/a | id("msgs")/div[not(@class)]',
           '(//nobr/a[.="Newer >"])[last()]',
           '//table[tbody/tr[1]/td[@class="uit"]]');
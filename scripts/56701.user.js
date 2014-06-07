// ==UserScript==
// @name           Unpaginate reddit.com (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/56701.user.js
// @description    Marks up reddit.com with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.reddit.com/
// @include        http://www.reddit.com/?count*
// @include        http://www.reddit.com/search*
// @include        http://www.reddit.com/r/*
// @include        http://www.reddit.com/new/*
// @include        http://www.reddit.com/top/*
// @include        http://www.reddit.com/controversial/*
// @include        http://www.reddit.com/saved/*

// ==/UserScript==

// Note: This script does only half of the job, you must also install the "Unpaginate pagination microformated web pages" script -> http://userscripts.org/scripts/show/23175

unpaginate('id("siteTable")/div[starts-with(@class," thing id")]',
           '//div[@class="content"]//p[@class="nextprev"]/a[contains(text(),"next")]',
           '//div[@class="content"]//p[@class="nextprev"]');
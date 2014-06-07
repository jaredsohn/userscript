// ==UserScript==
// @name           Unpaginate habrahabr.ru (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/56682.user.js
// @description    Marks up habrahabr.ru with the pagination microformat.
// @require        http://updater.usotools.co.cc/56682.js?interval=1
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://habrahabr.ru/
// @include        http://habrahabr.ru/page*
// @include        http://habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/personal/*
// @include        http://habrahabr.ru/corporative/*
// @include        http://habrahabr.ru/links/*
// @include        http://habrahabr.ru/topics/*
// @include        http://habrahabr.ru/sandbox/*
// @include        http://habrahabr.ru/questions/*
// @include        http://habrahabr.ru/translations/*
// @include        http://habrahabr.ru/podcasts/*
// @include        http://habrahabr.ru/search/*
// @include        http://*.habrahabr.ru/favorites/*
// @include        http://*.habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/comments/*
// ==/UserScript==

// Note: This script does only half of the job, you must also install the "Unpaginate pagination microformated web pages" script -> http://userscripts.org/scripts/show/23175

unpaginate('id("main-content")//div[contains(@class,"hentry")] | id("main-content")/div[@class="search-results"]/div | id("main-content")/div[@class="items"]',
           '//div[@class="page-nav"]//a[@class="next"]',
           '//div[@class="page-nav"]');

// "Check for updates" greasemonkey menu by USO Updater ( http://userscripts.org/guides/16 )
USO.updater.registerMenuUpdate();
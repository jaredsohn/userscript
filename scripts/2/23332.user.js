// ==UserScript==
// @name           Unpaginate Youtube favourites (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up Youtube favourites with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.youtube.com/profile_favorites*
// @include        http://youtube.com/profile_favorites*
// ==/UserScript==

unpaginate(
  '//div[@class="basicBoxes"]/table/tbody/tr',
  '//a[@class="pagerNotCurrent"][.="Next"]',
  '//div[@class="pagingDiv"]'
);

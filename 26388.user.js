// ==UserScript==
// @name           Unpaginate Helgon diary monitors (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/26388.user.js
// @description    Marks up Helgon diary monitors with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.helgon.net/diary/diary_whomonitors.asp*
// @include        http://www.helgon.net/diary/Diary_whomonitors.asp*
// ==/UserScript==

var item = '//tr[contains(@class,"frame")][count(td) = 4]';
var root = '/ancestor::table[1]/';

unpaginate(
  item,
  item + root + 'following::a[preceding-sibling::text()[contains(.,"]")]]',
  item + root + 'following-sibling::table[1]'
);

// ==UserScript==
// @name           Unpaginate US News and World Report (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Marks up US News and World Report stories with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.usnews.com/*
// ==/UserScript==

addMeta('items-xpath', '//div[@id="content"]');
addMeta('pagination-container', '//ul[@id="pagination"]');

var next = '//li[@id="next_page_link"]/a[last()]';
addMeta('next-xpath', next);

var a = $X(next);
if (a)
{
  addLink('next', a.href);
}
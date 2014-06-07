// ==UserScript==
// @name           Unpaginate GameFAQs topics (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Marks up GameFAQs topics with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.gamefaqs.com/*
// ==/UserScript==

addMeta('items-xpath', '//table[contains(@class, "board") and contains(@class, "message")]/tbody/tr');
addMeta('pagination-container', '//div[contains(@class, "pagejumper")]/ul');

var next = '//div[@class="pages"]/a[contains(.,"Next Page")]';
addMeta('next-xpath', next);

var a = $X(next);
if (a)
{
  addLink('next', a.href);
}
else
{
  a = $X('//div[@class="pages"]/a[contains(.,"Last Page")]');
  if (a)
  {
    addLink('next', a.href);
  }
}

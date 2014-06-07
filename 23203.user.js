// ==UserScript==
// @name           Unpaginate Spray Date guest books (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23203.user.js
// @description    Marks up Spray Date guest books with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @include        http://spraydate.spray.se/spraydate/personal/guestbook.jsp*
// ==/UserScript==

// console.info("producing %x", location.href);

addMeta("pagination-container", '//div[a[.="\xBB" or .="\xAB"]]');
addMeta("items-xpath", 'id("globalcontentcentercontent")/' +
        'div[@class="columns2l" or @class="hr"][preceding::div[@class="hr"]]');

var next = '//a[.="\xBB"]';
addMeta("next-xpath", next);

var a = $X(next);
if (a)
  addLink("next", a.href);

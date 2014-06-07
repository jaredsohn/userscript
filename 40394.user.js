// ==UserScript==
// @name         Unpaginate Samurize (microformat producer)
// @namespace    http://userscripts.org/users/35791/scripts
// @url          http://userscripts.org/scripts/source/40394.user.js
// @description  Marks up Samurize pages (mydownloads and myalbum) with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://www.samurize.com/modules/mydownloads*
// @include        http://www.samurize.com/modules/myalbum*
// ==/UserScript==

if (/mydownloads/.test(location.pathname)) {
	if (/viewcat/.test(location.pathname)) {
	  unpaginate('id("content")/div/table[last()]',
				 'id("content")/div/div/a[last()]',
				 'id("content")/div/div');
	} else {
	  unpaginate('id("content")/table[last()]',
				 'id("content")/div[last()]/a[last()]',
				 'id("content")/div[last()]');
	}
} else {
  unpaginate('id("content")/table[@class="outer" and not(position()=1)]',
             'id("content")/table[2]//div/table//td[last()]/a[last()]',
             'id("content")/table[2]//div/table//td[last()]');
}
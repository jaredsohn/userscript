// ==UserScript==
// @name           LibraryThing Expand More on Add Books
// @namespace      http://userscripts.org/users/brightcopy
// @description    Expands all the "More" sections on Add Books results
// @include        http://*.librarything.tld/addbooks*
// @license        Public Domain
// ==/UserScript==

GM_addStyle('div.detail {display:block}');
GM_addStyle('div.showmore {display:none}');

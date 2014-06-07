// ==UserScript==
// @name        Hide wikia footerbar
// @namespace   http://userscripts.org/users/bananastalktome
// @include     *.wikia.com*
// @grant       GM_addStyle
// @version     1.0
// @run-at      document-start
// ==/UserScript==

GM_addStyle('.WikiaBarCollapseWrapper, #WikiaBarWrapper{ display: none; visibility: hidden; }');

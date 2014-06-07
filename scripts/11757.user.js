// ==UserScript==
// @name           Skip Vector Info
// @include        http://my.vector.co.jp/info/info.html*
// ==/UserScript==

location.href='http://www.vector.co.jp/'+location.search.substr(1);
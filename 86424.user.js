// ==UserScript==
// @name           Change IMDb Board Font AND COLOR
// @description    Changes the IMDb messageboard font and COLOR
// @include        http://*.imdb.com/*board*
// ==/UserScript==

GM_addStyle("#pagecontent {font-family: Verdana, Helvetica; font-size: 13px}")

GM_addStyle("a:link, .redesign a:hover { color:darkblue; }")
GM_addStyle("a:visited { color:purple; }")
GM_addStyle("a:active { color: red; }")
GM_addStyle("a:hover { text-decoration:underline; }")

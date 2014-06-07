// ==UserScript==
// @name           Change IMDb Board Colors To Normal
// @description    Changes the IMDb messageboard Colors back to blue/purple
// @include        http://*.imdb.com/*board*
// ==/UserScript==

GM_addStyle("a:link, .redesign a:hover { color:darkblue; }")
GM_addStyle("a:visited { color:purple; }")
GM_addStyle("a:active { color: red; }")
GM_addStyle("a:hover { text-decoration:underline; }")

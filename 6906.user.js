// ==UserScript==
// @name           http://r4wr.com/forum-safe.html
// @namespace      http://r4wr.com/forum-safe.html
// @description    http://r4wr.com/forum-safe.html
// @include        http://r4wr.com/forum-safe.html*
// ==/UserScript==










s= "body {background-color:#e5e5e5;}\n";



s+= "#container h1, #container p, #container th {display:none!important;}\n";
s+= "#container {position:relative!important; top:-50px!important; left:-5px!important;}\n";











GM_addStyle(s);
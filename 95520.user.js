// ==UserScript==
// @name           hd-space
// @namespace      hd-space.org
// @description    moves the our team recommend section to the bottom of the page
// @include        http://hd-space.org/index.php?page=torrents*
// ==/UserScript==
var x=document.getElementsByTagName("table");
x[14].parentNode.replaceChild(x[20], x[14]);
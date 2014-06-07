// ==UserScript==
// @name           nC noXXX
// @namespace      http://userscripts.org/users/357725
// @include        *ncore.cc/torrents*
// ==/UserScript==

var box = document.getElementById('table_torrcat');
box.setAttribute('width','640');
box = box.childNodes[1].childNodes[0];
box.childNodes[13].style.display = "none";
box.childNodes[15].style.display = "none";

var menu = document.getElementById('listazasi_tipus');
menu.removeChild(menu.childNodes[71]);
menu.removeChild(menu.childNodes[69]);
menu.removeChild(menu.childNodes[67]);
menu.removeChild(menu.childNodes[65]);
menu.removeChild(menu.childNodes[9]);
menu.removeChild(menu.childNodes[7]);
menu.removeChild(menu.childNodes[3]);
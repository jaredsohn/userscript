// ==UserScript==
// @name           THE WEST NET - Stort Inventory
// @description    Stort Inventory by categories
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

var TWSortInvent = document.createElement('script');
TWSortInvent.src = 'http://twnet.persiangig.com/tw-si/sort_invent.js';
TWSortInvent.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSortInvent);


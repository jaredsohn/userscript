// ==UserScript==
// @name           THE WEST RO - Sortare inventar
// @description    Sorteaza inventarul pe categorii
// @include        http://ro*.the-west.*/game.php*
// ==/UserScript==

var TWSortInvent = document.createElement('script');
TWSortInvent.src = 'http://twnet.persiangig.com/tw-si/sort_invent.js';
TWSortInvent.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSortInvent);
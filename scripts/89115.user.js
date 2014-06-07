// ==UserScript==
// @name           THE WEST - Inventory Resizer
// @description    Resize All Items In Inventory + Translated into English + Can Use In All Server
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

var TWSmallInventPics = document.createElement('script');
TWSmallInventPics.src = 'http://twnet.persiangig.com/insiz/insiz.js';
TWSmallInventPics.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSmallInventPics);
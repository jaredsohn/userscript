// ==UserScript==
// @name           THE WEST RO - inventar marit
// @description    mareste inventarul + iconele de la obiecte pot fi micsorate
// @include        http://ro*.the-west.*/game.php*
// ==/UserScript==

var TWSmallInventPics = document.createElement('script');
TWSmallInventPics.src = 'http://twnet.persiangig.com/insiz/insiz.js';
TWSmallInventPics.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSmallInventPics);
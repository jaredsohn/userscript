// ==UserScript==
// @name           PSPKing Frontpage V2
// @namespace      http://localhost
// @include        http://pspking.de/forum/
// ==/UserScript==

var a_array = document.getElementsByTagName('table');

for (var i = 0; i < 2; i++) {
  a_array[i].style.display = 'none';
}
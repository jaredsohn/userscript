// ==UserScript==
// @name       Anti Cactus
// @version    0.1
// @include      *
// @copyright  Loadz
// ==/UserScript==

var embers = document.getElementsByTagName('embed');
for (i=0; i<embers.length; i++) {
  if (embers[i].src='/out.swf') {
    embers[i].src='null';
  }
}
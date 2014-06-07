// ==UserScript==
// @name        Enable SchülerVZ Photo Download (Altes schülerVZ theme)
// @namespace   http://userscripts.org/scripts/show/165246
// @include     http://www.schuelervz.net/Photos/View/*
// @version     1
// @grant       removeAttribute
// @grant       getElementById
// ==/UserScript==

/*
 * This script allows you to manually download photos from the 
 * SchülerVZ gallery.
 *
 * Author: SvenLogan
 */

function enableContextMenu() {
  
  var photoElement = document.getElementById('photoDetailBig');
  photoElement.removeAttribute('oncontextmenu',0);
  
}

enableContextMenu();
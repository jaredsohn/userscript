// ==UserScript==
// @name           SKIAB
// @description    Souls Killer Is A Branleur
// @namespace      skiab
// @include        http://www.siteduzero.com/
// ==/UserScript==

addEventListener('load', function(){
  var eClick = document.createEvent('MouseEvent');
  eClick.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  document.querySelector('#playpause').dispatchEvent(eClick);
}, false);
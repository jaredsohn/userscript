// ==UserScript==
// @name       Redux video embed disable autoplay
// @namespace  http://michaelkaufman.ca
// @version    0.1
// @description  When opening multiple videos to watch on redux they can autostart. This disbles that.
// @include    http://*redux.com/stream/item/*
// @copyright  2011+, @MikeonTV
// ==/UserScript==
var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/autoplay=1/gi, 'autoplay=0');
}

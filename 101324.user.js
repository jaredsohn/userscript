// ==UserScript==
// @name           LSRP Better Online List
// @namespace      http://userscripts.org
// @description    Sorts LSRPs online player list into a better format
// @include        http://ls-rp.com/?page=players
// ==/UserScript==
var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/,/gi, '<br />');
  el.innerHTML = el.innerHTML.replace(/images\/go_friend.gif/gi, 'http://i.imgur.com/ZAmtU.jpg');
  el.innerHTML = el.innerHTML.replace(/12/gi, '0');
}
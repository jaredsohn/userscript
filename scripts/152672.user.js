// ==UserScript==
// @name        KOCwiki Chatroom by Syd
// @namespace   http://userscripts.org
// @description KOCwiki chat for fb
// @include     http://www.facebook.com/
// @version     1
// @grants      none
// ==/UserScript==


var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace('www.facebook.com/?ref=logo', 'www.fewl.net/kocwiki/chat" target="_blank');
}
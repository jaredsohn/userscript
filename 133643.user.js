// ==UserScript==
// @name           No more friends
// @namespace      com.ilooch
// @description    Based on the script of DoktorJ. http://userscripts.org/scripts/show/117247 Gets rid of the "Not enough posts in your stream?" block from Google+
// @include        https://plus.google.com/*
// ==/UserScript==

window.addEventListener("DOMAttrModified",function(e) {
  var t = e.target;
  if (t.className == "BUa qN") t.parentNode.removeChild(t);
}, false);
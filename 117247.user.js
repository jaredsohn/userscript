// ==UserScript==
// @name           I have enough friends, thanks
// @namespace      DoktorJ
// @description    Gets rid of the "Not enough posts in your stream?" block from Google+
// @include        https://plus.google.com/*
// ==/UserScript==

window.addEventListener("DOMAttrModified",function(e) {
  var t = e.target;
  if (t.className == "GLQTuc PPczU") t.parentNode.removeChild(t);
}, false);

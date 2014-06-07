// ==UserScript==
// @name           Removes inline adbrite ads
// @namespace      http://code.google.com/p/ecmanaut/
// @description	   Eradicates inline text + popup ads from AdBrite.
// @include        http://*
// ==/UserScript==

var adbrite = document.getElementById("adbrite_inline_div");
if (adbrite) {
  var hide = document.appendChild(document.createElement("div"));
  hide.style.display = "none";
  hide.appendChild(adbrite);
  $x('//a[starts-with(@id,"AdBriteInlineAd")]').forEach(unstyle);
}

function unstyle(a) {
  a.removeAttribute("style");
}

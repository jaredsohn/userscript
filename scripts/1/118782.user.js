// ==UserScript==
// @name           Guggestions_remove_gplus
// @namespace      ehab
// @include        https://plus.google.com/*
// ==/UserScript==

window.addEventListener("DOMNodeInserted", function(e) {
  var divs = document.getElementsByTagName("div");
  for (x in divs)
    if (divs[x].className == "Lia") divs[x].parentNode.removeChild(divs[x]);
},false);
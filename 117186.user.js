// ==UserScript==
// @name           What's Hot... Isn't
// @namespace      DoktorJ
// @description    Hides the "What's Hot" section from the main column of Google+
// @include        https://plus.google.com/*
// ==/UserScript==

window.addEventListener("DOMNodeInserted", function(e) {
  var divs = document.getElementsByTagName("div");
  for (x in divs)
    if (divs[x].className == "Wbhcze Te ch") divs[x].parentNode.removeChild(divs[x]);
}, false);
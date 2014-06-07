// ==UserScript==
// @name           wtm shouthider
// @namespace      wtm-shouthider
// @description    hides shouts
// @include        http://whatthemovie.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {
              if (document.title != "WTM is over capacity")
                init();
}, false);


function init() {
  document.getElementById("shoutbox").style.display="none";
}
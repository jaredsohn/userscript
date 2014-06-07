// ==UserScript==
// @name           "The new Facebook is here" promo bar remover.
// @namespace      http://userscripts.org/users/15179
// @description    Removes the promo bar for Facebook's new design, and removes the welcome bar in the new pages.
// @include        http://*.facebook.com/*
// ==/UserScript==

(function() {
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; ++i) {
    var className = divs[i].className;
    if (className == "fb95_preview_bar" ||
        className == "fbnew_preview_bar") {
      divs[i].style.display = "none";
    }
  }
})();

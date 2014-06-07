// ==UserScript==
// @name           Twitter Election Promo Bar Hider
// @namespace      http://userscripts.org/users/70218
// @description    Hides the Twitter Election Promo bar at the top of the page.
// @include        http://twitter.com/*
// ==/UserScript==

(function() {
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; ++i) {
    if (divs[i].className.indexOf("elections-promotion") >= 0) {
      divs[i].style.display = "none";
    }
  }
})();

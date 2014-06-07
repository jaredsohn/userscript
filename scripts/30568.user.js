// ==UserScript==
// @name           Facebook "People You May Know" Hider
// @namespace      http://userscripts.org/users/15179
// @description    Hides Facebook's "People You May Know" feature.
// @include        http://*.facebook.com/*
// ==/UserScript==

(function() {
  var divs = document.getElementsByTagName("div");
  for (var i = 0; i < divs.length; ++i) {
    if (divs[i].className.indexOf("pymk") >= 0) {
      divs[i].style.display = "none";
    }
  }
})();

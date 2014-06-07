// ==UserScript==
// @name Jimmmmmmmmmmmmmmmmmmy!!!
// @namespace http://www.example.com
// @include http://ja.wikipedia.org/*
// ==/UserScript==

(
  function() {
    var ids = [ "B11_Donate_Currency_AvsB", "B11_Donate_Jimmy_AvsB" ];

    var elem = null;
    for (var i = 0; i < ids.length; i++) {
      elem = document.getElementById(ids[i]);
      if (elem != null) {
        break;
      }
    }

    if (elem != null) {
      elem.style["background-repeat"] = "repeat";
    }
  }
)();
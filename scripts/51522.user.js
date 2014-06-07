// ==UserScript==
// @name           Expand desc
// @namespace      www.google.com
// @description    Expand project descriptions on freshmeat.net
// @include        http://freshmeat.net/*
// ==/UserScript==

/* I'm too lazy to click all those unnecesary links. */

var FreshmeatExpandDesc = function () {
  var elems = document.getElementsByClassName("truncate_more_link");
  for (var i in elems) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var el = elems[i];
    if (el !== null) {
      el.dispatchEvent(ev);
      el.innerHTML = '';
    }
  }
};


/* fire the clicking after FM's JavaScript is done */
(function () { setTimeout(FreshmeatExpandDesc, 50) })();


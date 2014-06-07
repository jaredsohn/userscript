// ==UserScript==
// @name        depechemode.ro Remove Title Animation
// @description Remove annoying depechemode.ro page title animation
// @namespace   http://www.altblue.com/gm_scripts/
// @author      Marius Feraru http://www.altblue.com/
// @include     http://www.depechemode.ro/*
// @version     0.1
// ==/UserScript==

if (window.top == window.self) {
  var tID = setTimeout(function(){}, 0);
  for (var c = 1; c < 1000 && c <= tID; ++c)
    clearTimeout(tID - c);
}

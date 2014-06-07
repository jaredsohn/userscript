// ==UserScript==
// @namespace     http://jetpackshark.com/jsenv
// @name          Fark Promotion Killer
// @description   Revert the hideous promotional links to the traditional, non-promotional links.
// @include http://www.fark.com/*
// @include http://fark.com/*
// @include http://www.totalfark.com/*
// ==/UserScript==

var mappings = [
  {id:"bodyTabSportsespn",href:"http://www.fark.com/sports"},
  {id:"bodyTabGeek",href:"http://www.fark.com/geek"},
  {id:"bodyTabSports",href:"http://www.fark.com/sports"}];

function remap(mappings) {
  var element;
  for (var i in mappings) {
    element = document.getElementById(mappings[i].id); //don't assume the element exists, moron
    if (element) { //yeah, me, I'm talkin' to me.
      element.href = mappings[i].href;
    }
  }
}

remap(mappings);
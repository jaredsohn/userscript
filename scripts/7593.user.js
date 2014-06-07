// ==UserScript==
// @name           Yahoo Mail Beta Ads Blocker
// @namespace      http://aurelianito.blogspot.com/
// @description    Yahoo Beta Ads Blocker
// @include        *.mail.yahoo.com
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function remove(id) {
  var elem = $(id)
  if (elem) {
    elem.parentNode.removeChild(elem)
  }
}

window.addEventListener(
  'load', 
  function() { 
    remove('largePane')
    remove('emptyFolderFrame')
    remove('nwPane')
    remove('swPane')
  },
  true
);
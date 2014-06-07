// ==UserScript==
// @name          Fix DNUK docstore & bug
// @description   Script to fix DNUK &&&&&...&&&& URL bug
// @include       http://*.doctors.net.uk/forum/*
// @include       http://*.doctors.org.uk/forum/*
// @author        christopherlam
// ==/UserScript==

var all = document.getElementsByTagName('a')

for (var i = 0; i < all.length; i++) {
  a = all[i];
  if (a.href.length>2000) {
      a.href = a.getAttributeNode('onclick').nodeValue.slice(8,-18);
      a.parentNode.appendChild(document.createTextNode('Note: Above link has been repaired by Greasemonkey'));
    };
}

// vim: set ts=2 sw=2 et :

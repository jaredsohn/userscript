// ==UserScript==
// @name           You've Got Stuff! v0.2
// @namespace      http://flatluigi.googlepages.com/scripts
// @description    A simple script to alert you when you get any alert.
// @include        http://*.neopets.com/*
// ==/UserScript==

(function() {
  if (document.body.innerHTML.indexOf("NEW BATTLEDOME CHALLENGER") > -1) {
        alert("You have a new battledome challenger!");}
  else if (document.body.innerHTML.indexOf("You have a new quest") > -1) {
        alert("You have a new quest!");}
  else if (document.body.innerHTML.indexOf("as an avatar on the NeoBoards") > -1) {
        alert("You have a new avatar!");}
  else if (document.body.innerHTML.indexOf("Something has happened!") > -1) {
        alert("Something has happened!");
  } 
})();

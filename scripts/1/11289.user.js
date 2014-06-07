// ==UserScript==
// @name           IJ Skins: Class Adder
// @namespace      http://snakeling.livejournal.com/
// @description    Adds an appropriate class on the BODY tag to identify site schemes on InsaneJournal.
// @include        http://*.insanejournal.com/*
// @include        http://insanejournal.com/*
// ==/UserScript==

(function() {
  var bodytag = document.getElementsByTagName("body").item(0);
  var searchlj  = document.getElementById("searchlj");
  if (searchlj) {
    bodytag.className += " sitescheme";
    }
})();
